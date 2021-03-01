import test from 'ava'
import {
  NNF,
  PF,
  MNNF,
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
import { fromNumberNonNegative } from './fromNumberNonNegative.js'

test('fromNumberNonNegative()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  // @ts-expect-error
  isType<never>()(fromNumberNonNegative(1))
  isType<MNNF>()(fromNumberNonNegative(1))
  // @ts-expect-error
  isType<never>()(fromNumberNonNegative(n()))
  isType<MNNF>()(fromNumberNonNegative(n()))
  // @ts-expect-error
  isType<never>()(fromNumberNonNegative(f()))
  isType<MNNF>()(fromNumberNonNegative(f()))
  // @ts-expect-error
  isType<never>()(fromNumberNonNegative(nf()))
  isType<Nothing>()(fromNumberNonNegative(nf()))
  // @ts-expect-error
  isType<never>()(fromNumberNonNegative(npf()))
  isType<MNNF>()(fromNumberNonNegative(npf()))
  // @ts-expect-error
  isType<never>()(fromNumberNonNegative(nnf()))
  isType<NNF>()(fromNumberNonNegative(nnf()))
  // @ts-expect-error
  isType<never>()(fromNumberNonNegative(pf()))
  isType<PF>()(fromNumberNonNegative(pf()))

  is(Nothing, fromNumberNonNegative(MINIMUM - 10 ** 291))
  is(Nothing, fromNumberNonNegative(MINIMUM + 10 ** 292))
  is(Nothing, fromNumberNonNegative(MINIMUM + 10 ** 308))
  is(f(7.976931348623157e307), fromNumberNonNegative(MAXIMUM - 10 ** 308))
  is(f(1.7976931348623155e308), fromNumberNonNegative(MAXIMUM - 10 ** 292))
  is(f(1.7976931348623157e308), fromNumberNonNegative(MAXIMUM + 10 ** 291))

  is(Nothing, fromNumberNonNegative(MINIMUM - 1))
  is(Nothing, fromNumberNonNegative(MINIMUM))
  is(Nothing, fromNumberNonNegative(-1.1))
  is(Nothing, fromNumberNonNegative(-1.0))
  is(Nothing, fromNumberNonNegative(-1))
  is(Nothing, fromNumberNonNegative(-EPSILON))
  is(Nothing, fromNumberNonNegative(-SMALLEST))
  is(f(-0), fromNumberNonNegative(-0.0))
  is(f(-0), fromNumberNonNegative(-0))
  is(f(0), fromNumberNonNegative(0))
  is(f(0), fromNumberNonNegative(0.0))
  is(f(5e-324), fromNumberNonNegative(SMALLEST))
  is(f(2.220446049250313e-16), fromNumberNonNegative(EPSILON))
  is(f(1), fromNumberNonNegative(1))
  is(f(1), fromNumberNonNegative(1.0))
  is(f(1.1), fromNumberNonNegative(1.1))
  is(f(1.7976931348623157e308), fromNumberNonNegative(MAXIMUM))
  is(f(1.7976931348623157e308), fromNumberNonNegative(MAXIMUM + 1))

  is(Nothing, fromNumberNonNegative(nan()))
  is(Nothing, fromNumberNonNegative(inf()))
})
