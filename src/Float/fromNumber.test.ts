import test from 'ava'
import {
  F,
  NF,
  NPF,
  NNF,
  PF,
  MF,
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
import { fromNumber } from './fromNumber.js'

test('fromNumber()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  // @ts-expect-error
  isType<never>()(fromNumber(1))
  isType<MF>()(fromNumber(1))
  // @ts-expect-error
  isType<never>()(fromNumber(n()))
  isType<MF>()(fromNumber(n()))
  // @ts-expect-error
  isType<never>()(fromNumber(f()))
  isType<F>()(fromNumber(f()))
  // @ts-expect-error
  isType<never>()(fromNumber(nf()))
  isType<NF>()(fromNumber(nf()))
  // @ts-expect-error
  isType<never>()(fromNumber(npf()))
  isType<NPF>()(fromNumber(npf()))
  // @ts-expect-error
  isType<never>()(fromNumber(nnf()))
  isType<NNF>()(fromNumber(nnf()))
  // @ts-expect-error
  isType<never>()(fromNumber(pf()))
  isType<PF>()(fromNumber(pf()))

  is(f(-1.7976931348623157e308), fromNumber(MINIMUM - 10 ** 291))
  is(f(-1.7976931348623155e308), fromNumber(MINIMUM + 10 ** 292))
  is(f(-7.976931348623157e307), fromNumber(MINIMUM + 10 ** 308))
  is(f(7.976931348623157e307), fromNumber(MAXIMUM - 10 ** 308))
  is(f(1.7976931348623155e308), fromNumber(MAXIMUM - 10 ** 292))
  is(f(1.7976931348623157e308), fromNumber(MAXIMUM + 10 ** 291))

  is(f(-1.7976931348623157e308), fromNumber(MINIMUM - 1))
  is(f(-1.7976931348623157e308), fromNumber(MINIMUM))
  is(f(-1.1), fromNumber(-1.1))
  is(f(-1), fromNumber(-1.0))
  is(f(-1), fromNumber(-1))
  is(f(-2.220446049250313e-16), fromNumber(-EPSILON))
  is(f(-5e-324), fromNumber(-SMALLEST))
  is(f(-0), fromNumber(-0.0))
  is(f(-0), fromNumber(-0))
  is(f(0), fromNumber(0))
  is(f(0), fromNumber(0.0))
  is(f(5e-324), fromNumber(SMALLEST))
  is(f(2.220446049250313e-16), fromNumber(EPSILON))
  is(f(1), fromNumber(1))
  is(f(1), fromNumber(1.0))
  is(f(1.1), fromNumber(1.1))
  is(f(1.7976931348623157e308), fromNumber(MAXIMUM))
  is(f(1.7976931348623157e308), fromNumber(MAXIMUM + 1))

  is(Nothing, fromNumber(nan()))
  is(Nothing, fromNumber(inf()))
})
