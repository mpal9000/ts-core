import test from 'ava'
import {
  F,
  NPF,
  PF,
  MF,
  MNPF,
  MPF,
  wrapIs,
  isType,
  f,
  nf,
  npf,
  nnf,
  pf,
  mf,
  mnf,
  mnpf,
  mnnf,
  mpf,
} from '../test.js'
import { Nothing } from '../types/Float.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { increment } from './increment.js'

test('increment()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(f(2.1), isType<F>()(increment(f(1.1))))
  is(f(-0.10000000000000009), isType<NPF>()(increment(nf(-1.1))))
  is(f(0.9), isType<F>()(increment(npf(-0.1))))
  is(f(1.1), isType<PF>()(increment(nnf(0.1))))
  is(f(2.1), isType<PF>()(increment(pf(1.1))))

  is(f(2.1), isType<MF>()(increment(mf(1.1))))
  is(f(-0.10000000000000009), isType<MNPF>()(increment(mnf(-1.1))))
  is(f(0.9), isType<MF>()(increment(mnpf(-0.1))))
  is(f(1.1), isType<MPF>()(increment(mnnf(0.1))))
  is(f(2.1), isType<MPF>()(increment(mpf(1.1))))

  is(Nothing, isType<Nothing>()(increment(Nothing)))

  is(f(1.0000000000000002), increment(f(EPSILON)))
  is(f(2.220446049250313e-16), increment(f(EPSILON - 1)))
  is(f(2), increment(f(EPSILON + 1)))

  is(f(1), increment(f(SMALLEST)))
  is(f(0), increment(f(SMALLEST - 1)))
  is(f(2), increment(f(SMALLEST + 1)))

  is(f(-1.7976931348623157e308), increment(f(MINIMUM)))
  is(f(1.7976931348623157e308), increment(f(MAXIMUM)))
})
