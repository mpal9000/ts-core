import test from 'ava'
import {
  PF,
  MPF,
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
import { fromNumberPositive } from './fromNumberPositive.js'

test('fromNumberPositive()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  // @ts-expect-error
  isType<never>()(fromNumberPositive(1))
  isType<MPF>()(fromNumberPositive(1))
  // @ts-expect-error
  isType<never>()(fromNumberPositive(n()))
  isType<MPF>()(fromNumberPositive(n()))
  // @ts-expect-error
  isType<never>()(fromNumberPositive(f()))
  isType<MPF>()(fromNumberPositive(f()))
  // @ts-expect-error
  isType<never>()(fromNumberPositive(nf()))
  isType<Nothing>()(fromNumberPositive(nf()))
  // @ts-expect-error
  isType<never>()(fromNumberPositive(npf()))
  isType<Nothing>()(fromNumberPositive(npf()))
  // @ts-expect-error
  isType<never>()(fromNumberPositive(nnf()))
  isType<MPF>()(fromNumberPositive(nnf()))
  // @ts-expect-error
  isType<never>()(fromNumberPositive(pf()))
  isType<PF>()(fromNumberPositive(pf()))

  is(Nothing, fromNumberPositive(MINIMUM - 10 ** 291))
  is(Nothing, fromNumberPositive(MINIMUM + 10 ** 292))
  is(Nothing, fromNumberPositive(MINIMUM + 10 ** 308))
  is(f(7.976931348623157e307), fromNumberPositive(MAXIMUM - 10 ** 308))
  is(f(1.7976931348623155e308), fromNumberPositive(MAXIMUM - 10 ** 292))
  is(f(1.7976931348623157e308), fromNumberPositive(MAXIMUM + 10 ** 291))

  is(Nothing, fromNumberPositive(MINIMUM - 1))
  is(Nothing, fromNumberPositive(MINIMUM))
  is(Nothing, fromNumberPositive(-1.1))
  is(Nothing, fromNumberPositive(-1.0))
  is(Nothing, fromNumberPositive(-1))
  is(Nothing, fromNumberPositive(-EPSILON))
  is(Nothing, fromNumberPositive(-SMALLEST))
  is(Nothing, fromNumberPositive(-0.0))
  is(Nothing, fromNumberPositive(-0))
  is(Nothing, fromNumberPositive(0))
  is(Nothing, fromNumberPositive(0.0))
  is(f(5e-324), fromNumberPositive(SMALLEST))
  is(f(2.220446049250313e-16), fromNumberPositive(EPSILON))
  is(f(1), fromNumberPositive(1))
  is(f(1), fromNumberPositive(1.0))
  is(f(1.1), fromNumberPositive(1.1))
  is(f(1.7976931348623157e308), fromNumberPositive(MAXIMUM))
  is(f(1.7976931348623157e308), fromNumberPositive(MAXIMUM + 1))

  is(Nothing, fromNumberPositive(nan()))
  is(Nothing, fromNumberPositive(inf()))
})
