import test from 'ava'
import {
  NF,
  MNF,
  wrapIs,
  isType,
  nan,
  inf,
  n,
  f,
  nf,
  npf,
  nnf,
  pf,
} from '../test.js'
import { Nothing } from '../types/Float.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { fromNumberNegative } from './fromNumberNegative.js'

test('fromNumberNegative()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  // @ts-expect-error
  isType<never>()(fromNumberNegative(1))
  isType<MNF>()(fromNumberNegative(1))
  // @ts-expect-error
  isType<never>()(fromNumberNegative(n()))
  isType<MNF>()(fromNumberNegative(n()))
  // @ts-expect-error
  isType<never>()(fromNumberNegative(f()))
  isType<MNF>()(fromNumberNegative(f()))
  // @ts-expect-error
  isType<never>()(fromNumberNegative(nf()))
  isType<NF>()(fromNumberNegative(nf()))
  // @ts-expect-error
  isType<never>()(fromNumberNegative(npf()))
  isType<MNF>()(fromNumberNegative(npf()))
  // @ts-expect-error
  isType<never>()(fromNumberNegative(nnf()))
  isType<Nothing>()(fromNumberNegative(nnf()))
  // @ts-expect-error
  isType<never>()(fromNumberNegative(pf()))
  isType<Nothing>()(fromNumberNegative(pf()))

  is(f(-1.7976931348623157e308), fromNumberNegative(MINIMUM - 10 ** 291))
  is(f(-1.7976931348623155e308), fromNumberNegative(MINIMUM + 10 ** 292))
  is(f(-7.976931348623157e307), fromNumberNegative(MINIMUM + 10 ** 308))
  is(Nothing, fromNumberNegative(MAXIMUM - 10 ** 308))
  is(Nothing, fromNumberNegative(MAXIMUM - 10 ** 292))
  is(Nothing, fromNumberNegative(MAXIMUM + 10 ** 291))

  is(f(-1.7976931348623157e308), fromNumberNegative(MINIMUM - 1))
  is(f(-1.7976931348623157e308), fromNumberNegative(MINIMUM))
  is(f(-1.1), fromNumberNegative(-1.1))
  is(f(-1), fromNumberNegative(-1.0))
  is(f(-1), fromNumberNegative(-1))
  is(f(-2.220446049250313e-16), fromNumberNegative(-EPSILON))
  is(f(-5e-324), fromNumberNegative(-SMALLEST))
  is(Nothing, fromNumberNegative(-0.0))
  is(Nothing, fromNumberNegative(-0))
  is(Nothing, fromNumberNegative(0))
  is(Nothing, fromNumberNegative(0.0))
  is(Nothing, fromNumberNegative(SMALLEST))
  is(Nothing, fromNumberNegative(EPSILON))
  is(Nothing, fromNumberNegative(1))
  is(Nothing, fromNumberNegative(1.0))
  is(Nothing, fromNumberNegative(1.1))
  is(Nothing, fromNumberNegative(MAXIMUM))
  is(Nothing, fromNumberNegative(MAXIMUM + 1))

  is(Nothing, fromNumberNegative(nan()))
  is(Nothing, fromNumberNegative(inf()))
})
