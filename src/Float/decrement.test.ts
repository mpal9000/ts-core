import test from 'ava'
import {
  F,
  NF,
  NNF,
  MF,
  MNF,
  MNNF,
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
import { decrement } from './decrement.js'

test('decrement()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(f(0.10000000000000009), isType<F>()(decrement(f(1.1))))
  is(f(-2.1), isType<NF>()(decrement(nf(-1.1))))
  is(f(-1.1), isType<NF>()(decrement(npf(-0.1))))
  is(f(-0.9), isType<F>()(decrement(nnf(0.1))))
  is(f(0.10000000000000009), isType<NNF>()(decrement(pf(1.1))))

  is(f(0.10000000000000009), isType<MF>()(decrement(mf(1.1))))
  is(f(-2.1), isType<MNF>()(decrement(mnf(-1.1))))
  is(f(-1.1), isType<MNF>()(decrement(mnpf(-0.1))))
  is(f(-0.9), isType<MF>()(decrement(mnnf(0.1))))
  is(f(0.10000000000000009), isType<MNNF>()(decrement(mpf(1.1))))

  is(Nothing, isType<Nothing>()(decrement(Nothing)))

  is(f(-0.9999999999999998), decrement(f(EPSILON)))
  is(f(-1.9999999999999998), decrement(f(EPSILON - 1)))
  is(f(2.220446049250313e-16), decrement(f(EPSILON + 1)))

  is(f(-1), decrement(f(SMALLEST)))
  is(f(-2), decrement(f(SMALLEST - 1)))
  is(f(0), decrement(f(SMALLEST + 1)))

  is(f(-1.7976931348623157e308), decrement(f(MINIMUM)))
  is(f(1.7976931348623157e308), decrement(f(MAXIMUM)))
})
