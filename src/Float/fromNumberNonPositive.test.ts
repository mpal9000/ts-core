import test from 'ava'
import {
  NF,
  NPF,
  MNPF,
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
import { fromNumberNonPositive } from './fromNumberNonPositive.js'

test('fromNumberNonPositive()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  // @ts-expect-error
  isType<never>()(fromNumberNonPositive(1))
  isType<MNPF>()(fromNumberNonPositive(1))
  // @ts-expect-error
  isType<never>()(fromNumberNonPositive(n()))
  isType<MNPF>()(fromNumberNonPositive(n()))
  // @ts-expect-error
  isType<never>()(fromNumberNonPositive(f()))
  isType<MNPF>()(fromNumberNonPositive(f()))
  // @ts-expect-error
  isType<never>()(fromNumberNonPositive(nf()))
  isType<NF>()(fromNumberNonPositive(nf()))
  // @ts-expect-error
  isType<never>()(fromNumberNonPositive(npf()))
  isType<NPF>()(fromNumberNonPositive(npf()))
  // @ts-expect-error
  isType<never>()(fromNumberNonPositive(nnf()))
  isType<MNPF>()(fromNumberNonPositive(nnf()))
  // @ts-expect-error
  isType<never>()(fromNumberNonPositive(pf()))
  isType<Nothing>()(fromNumberNonPositive(pf()))

  is(f(-1.7976931348623157e308), fromNumberNonPositive(MINIMUM - 10 ** 291))
  is(f(-1.7976931348623155e308), fromNumberNonPositive(MINIMUM + 10 ** 292))
  is(f(-7.976931348623157e307), fromNumberNonPositive(MINIMUM + 10 ** 308))
  is(Nothing, fromNumberNonPositive(MAXIMUM - 10 ** 308))
  is(Nothing, fromNumberNonPositive(MAXIMUM - 10 ** 292))
  is(Nothing, fromNumberNonPositive(MAXIMUM + 10 ** 291))

  is(f(-1.7976931348623157e308), fromNumberNonPositive(MINIMUM - 1))
  is(f(-1.7976931348623157e308), fromNumberNonPositive(MINIMUM))
  is(f(-1.1), fromNumberNonPositive(-1.1))
  is(f(-1), fromNumberNonPositive(-1.0))
  is(f(-1), fromNumberNonPositive(-1))
  is(f(-2.220446049250313e-16), fromNumberNonPositive(-EPSILON))
  is(f(-5e-324), fromNumberNonPositive(-SMALLEST))
  is(f(-0), fromNumberNonPositive(-0.0))
  is(f(-0), fromNumberNonPositive(-0))
  is(f(0), fromNumberNonPositive(0))
  is(f(0), fromNumberNonPositive(0.0))
  is(Nothing, fromNumberNonPositive(SMALLEST))
  is(Nothing, fromNumberNonPositive(EPSILON))
  is(Nothing, fromNumberNonPositive(1))
  is(Nothing, fromNumberNonPositive(1.0))
  is(Nothing, fromNumberNonPositive(1.1))
  is(Nothing, fromNumberNonPositive(MAXIMUM))
  is(Nothing, fromNumberNonPositive(MAXIMUM + 1))

  is(Nothing, fromNumberNonPositive(nan()))
  is(Nothing, fromNumberNonPositive(inf()))
})
