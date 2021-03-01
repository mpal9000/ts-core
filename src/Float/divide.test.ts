import test from 'ava'
import {
  MF,
  MNF,
  MNPF,
  MNNF,
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
import { divide } from './divide.js'

test('divide()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(mf(nf() / nf()), isType<MPF>()(divide(nf(), nf())))
  is(mf(pf() / pf()), isType<MPF>()(divide(pf(), pf())))
  is(mf(f() / nf()), isType<MF>()(divide(nf(), f())))
  is(mf(f() / pf()), isType<MF>()(divide(pf(), f())))
  is(mf(npf() / nf()), isType<MNNF>()(divide(nf(), npf())))
  is(mf(nnf() / nf()), isType<MNPF>()(divide(nf(), nnf())))
  is(mf(pf() / nf()), isType<MNF>()(divide(nf(), pf())))
  is(mf(nf() / pf()), isType<MNF>()(divide(pf(), nf())))
  is(mf(npf() / pf()), isType<MNPF>()(divide(pf(), npf())))
  is(mf(nnf() / pf()), isType<MNNF>()(divide(pf(), nnf())))

  is(Nothing, isType<MPF>()(divide(mnf(), mnf())))
  is(Nothing, isType<MPF>()(divide(mpf(), mpf())))
  is(Nothing, isType<MF>()(divide(mnf(), mf())))
  is(Nothing, isType<MF>()(divide(mpf(), mf())))
  is(Nothing, isType<MNNF>()(divide(mnf(), mnpf())))
  is(Nothing, isType<MNPF>()(divide(mnf(), mnnf())))
  is(Nothing, isType<MNF>()(divide(mnf(), mpf())))
  is(Nothing, isType<MNF>()(divide(mpf(), mnf())))
  is(Nothing, isType<MNPF>()(divide(mpf(), mnpf())))
  is(Nothing, isType<MNNF>()(divide(mpf(), mnnf())))

  is(Nothing, isType<MPF>()(divide(mnf(), nf())))
  is(Nothing, isType<MPF>()(divide(mpf(), pf())))
  is(Nothing, isType<MF>()(divide(mnf(), f())))
  is(Nothing, isType<MF>()(divide(mpf(), f())))
  is(Nothing, isType<MNNF>()(divide(mnf(), npf())))
  is(Nothing, isType<MNPF>()(divide(mnf(), nnf())))
  is(Nothing, isType<MNF>()(divide(mnf(), pf())))
  is(Nothing, isType<MNF>()(divide(mpf(), nf())))
  is(Nothing, isType<MNPF>()(divide(mpf(), npf())))
  is(Nothing, isType<MNNF>()(divide(mpf(), nnf())))

  is(Nothing, isType<MPF>()(divide(nf(), mnf())))
  is(Nothing, isType<MPF>()(divide(pf(), mpf())))
  is(Nothing, isType<MF>()(divide(nf(), mf())))
  is(Nothing, isType<MF>()(divide(pf(), mf())))
  is(Nothing, isType<MNNF>()(divide(nf(), mnpf())))
  is(Nothing, isType<MNPF>()(divide(nf(), mnnf())))
  is(Nothing, isType<MNF>()(divide(nf(), mpf())))
  is(Nothing, isType<MNF>()(divide(pf(), mnf())))
  is(Nothing, isType<MNPF>()(divide(pf(), mnpf())))
  is(Nothing, isType<MNNF>()(divide(pf(), mnnf())))

  is(Nothing, isType<Nothing>()(divide(Nothing, f())))
  is(Nothing, isType<Nothing>()(divide(Nothing, nf())))
  is(Nothing, isType<Nothing>()(divide(Nothing, npf())))
  is(Nothing, isType<Nothing>()(divide(Nothing, nnf())))
  is(Nothing, isType<Nothing>()(divide(Nothing, pf())))

  is(Nothing, isType<Nothing>()(divide(Nothing, mf())))
  is(Nothing, isType<Nothing>()(divide(Nothing, mnf())))
  is(Nothing, isType<Nothing>()(divide(Nothing, mnpf())))
  is(Nothing, isType<Nothing>()(divide(Nothing, mnnf())))
  is(Nothing, isType<Nothing>()(divide(Nothing, mpf())))

  is(Nothing, isType<Nothing>()(divide(nf(), Nothing)))
  is(Nothing, isType<Nothing>()(divide(pf(), Nothing)))

  is(Nothing, isType<Nothing>()(divide(mnf(), Nothing)))
  is(Nothing, isType<Nothing>()(divide(mpf(), Nothing)))

  is(Nothing, isType<Nothing>()(divide(Nothing, Nothing)))

  is(f(2), divide(pf(2), pf(4)))
  is(f(1.3333333333333333), divide(pf(3), pf(4)))
  is(f(1), divide(pf(4), pf(4)))
  is(f(0.8), divide(pf(5), pf(4)))
  is(f(0.6666666666666666), divide(pf(6), pf(4)))

  is(f(-2), divide(pf(2), nf(-4)))
  is(f(-1.3333333333333333), divide(pf(3), nf(-4)))
  is(f(-1), divide(pf(4), nf(-4)))
  is(f(-0.8), divide(pf(5), nf(-4)))
  is(f(-0.6666666666666666), divide(pf(6), nf(-4)))

  is(f(-2), divide(nf(-2), pf(4)))
  is(f(-1.3333333333333333), divide(nf(-3), pf(4)))
  is(f(-1), divide(nf(-4), pf(4)))
  is(f(-0.8), divide(nf(-5), pf(4)))
  is(f(-0.6666666666666666), divide(nf(-6), pf(4)))

  is(f(2), divide(nf(-2), nf(-4)))
  is(f(1.3333333333333333), divide(nf(-3), nf(-4)))
  is(f(1), divide(nf(-4), nf(-4)))
  is(f(0.8), divide(nf(-5), nf(-4)))
  is(f(0.6666666666666666), divide(nf(-6), nf(-4)))

  is(f(1), divide(pf(EPSILON), pf(EPSILON)))
  is(f(2.2250738585072014e-308), divide(pf(EPSILON), pf(SMALLEST)))
  is(Nothing, divide(pf(EPSILON), nf(MINIMUM)))
  is(Nothing, divide(pf(EPSILON), pf(MAXIMUM)))

  is(f(4.49423283715579e307), divide(pf(SMALLEST), pf(EPSILON)))
  is(f(1), divide(pf(SMALLEST), pf(SMALLEST)))
  is(Nothing, divide(pf(SMALLEST), nf(MINIMUM)))
  is(Nothing, divide(pf(SMALLEST), pf(MAXIMUM)))

  is(f(-0), divide(nf(MINIMUM), pf(EPSILON)))
  is(f(-0), divide(nf(MINIMUM), pf(SMALLEST)))
  is(f(1), divide(nf(MINIMUM), nf(MINIMUM)))
  is(f(-1), divide(nf(MINIMUM), pf(MAXIMUM)))

  is(f(0), divide(pf(MAXIMUM), pf(EPSILON)))
  is(f(0), divide(pf(MAXIMUM), pf(SMALLEST)))
  is(f(-1), divide(pf(MAXIMUM), nf(MINIMUM)))
  is(f(1), divide(pf(MAXIMUM), pf(MAXIMUM)))

  // @ts-expect-error
  divide(f(), f())
  // @ts-expect-error
  divide(npf(), npf())
  // @ts-expect-error
  divide(nnf(), nnf())
  // @ts-expect-error
  divide(f(), nf())
  // @ts-expect-error
  divide(f(), npf())
  // @ts-expect-error
  divide(npf(), f())
  // @ts-expect-error
  divide(f(), nnf())
  // @ts-expect-error
  divide(nnf(), f())
  // @ts-expect-error
  divide(f(), pf())
  // @ts-expect-error
  divide(npf(), nf())
  // @ts-expect-error
  divide(nnf(), nf())
  // @ts-expect-error
  divide(npf(), nnf())
  // @ts-expect-error
  divide(nnf(), npf())
  // @ts-expect-error
  divide(npf(), pf())
  // @ts-expect-error
  divide(nnf(), pf())
})
