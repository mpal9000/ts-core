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
import { multiply } from './multiply.js'

test('multiply()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(mf(f() * f()), isType<MF>()(multiply(f(), f())))
  is(mf(nf() * nf()), isType<MPF>()(multiply(nf(), nf())))
  is(mf(npf() * npf()), isType<MNNF>()(multiply(npf(), npf())))
  is(mf(nnf() * nnf()), isType<MNNF>()(multiply(nnf(), nnf())))
  is(mf(pf() * pf()), isType<MPF>()(multiply(pf(), pf())))
  is(mf(nf() * f()), isType<MF>()(multiply(f(), nf())))
  is(mf(f() * nf()), isType<MF>()(multiply(nf(), f())))
  is(mf(npf() * f()), isType<MF>()(multiply(f(), npf())))
  is(mf(f() * npf()), isType<MF>()(multiply(npf(), f())))
  is(mf(nnf() * f()), isType<MF>()(multiply(f(), nnf())))
  is(mf(f() * nnf()), isType<MF>()(multiply(nnf(), f())))
  is(mf(pf() * f()), isType<MF>()(multiply(f(), pf())))
  is(mf(f() * pf()), isType<MF>()(multiply(pf(), f())))
  is(mf(npf() * nf()), isType<MNNF>()(multiply(nf(), npf())))
  is(mf(nf() * npf()), isType<MNNF>()(multiply(npf(), nf())))
  is(mf(nnf() * nf()), isType<MNPF>()(multiply(nf(), nnf())))
  is(mf(nf() * nnf()), isType<MNPF>()(multiply(nnf(), nf())))
  is(mf(pf() * nf()), isType<MNF>()(multiply(nf(), pf())))
  is(mf(nf() * pf()), isType<MNF>()(multiply(pf(), nf())))
  is(mf(nnf() * npf()), isType<MNPF>()(multiply(npf(), nnf())))
  is(mf(npf() * nnf()), isType<MNPF>()(multiply(nnf(), npf())))
  is(mf(pf() * npf()), isType<MNPF>()(multiply(npf(), pf())))
  is(mf(npf() * pf()), isType<MNPF>()(multiply(pf(), npf())))
  is(mf(pf() * nnf()), isType<MNNF>()(multiply(nnf(), pf())))
  is(mf(nnf() * pf()), isType<MNNF>()(multiply(pf(), nnf())))

  is(Nothing, isType<MF>()(multiply(mf(), mf())))
  is(Nothing, isType<MPF>()(multiply(mnf(), mnf())))
  is(Nothing, isType<MNNF>()(multiply(mnpf(), mnpf())))
  is(Nothing, isType<MNNF>()(multiply(mnnf(), mnnf())))
  is(Nothing, isType<MPF>()(multiply(mpf(), mpf())))
  is(Nothing, isType<MF>()(multiply(mf(), mnf())))
  is(Nothing, isType<MF>()(multiply(mnf(), mf())))
  is(Nothing, isType<MF>()(multiply(mf(), mnpf())))
  is(Nothing, isType<MF>()(multiply(mnpf(), mf())))
  is(Nothing, isType<MF>()(multiply(mf(), mnnf())))
  is(Nothing, isType<MF>()(multiply(mnnf(), mf())))
  is(Nothing, isType<MF>()(multiply(mf(), mpf())))
  is(Nothing, isType<MF>()(multiply(mpf(), mf())))
  is(Nothing, isType<MNNF>()(multiply(mnf(), mnpf())))
  is(Nothing, isType<MNNF>()(multiply(mnpf(), mnf())))
  is(Nothing, isType<MNPF>()(multiply(mnf(), mnnf())))
  is(Nothing, isType<MNPF>()(multiply(mnnf(), mnf())))
  is(Nothing, isType<MNF>()(multiply(mnf(), mpf())))
  is(Nothing, isType<MNF>()(multiply(mpf(), mnf())))
  is(Nothing, isType<MNPF>()(multiply(mnpf(), mnnf())))
  is(Nothing, isType<MNPF>()(multiply(mnnf(), mnpf())))
  is(Nothing, isType<MNPF>()(multiply(mnpf(), mpf())))
  is(Nothing, isType<MNPF>()(multiply(mpf(), mnpf())))
  is(Nothing, isType<MNNF>()(multiply(mnnf(), mpf())))
  is(Nothing, isType<MNNF>()(multiply(mpf(), mnnf())))

  is(Nothing, isType<MF>()(multiply(mf(), f())))
  is(Nothing, isType<MPF>()(multiply(mnf(), nf())))
  is(Nothing, isType<MNNF>()(multiply(mnpf(), npf())))
  is(Nothing, isType<MNNF>()(multiply(mnnf(), nnf())))
  is(Nothing, isType<MPF>()(multiply(mpf(), pf())))
  is(Nothing, isType<MF>()(multiply(mf(), nf())))
  is(Nothing, isType<MF>()(multiply(mnf(), f())))
  is(Nothing, isType<MF>()(multiply(mf(), npf())))
  is(Nothing, isType<MF>()(multiply(mnpf(), f())))
  is(Nothing, isType<MF>()(multiply(mf(), nnf())))
  is(Nothing, isType<MF>()(multiply(mnnf(), f())))
  is(Nothing, isType<MF>()(multiply(mf(), pf())))
  is(Nothing, isType<MF>()(multiply(mpf(), f())))
  is(Nothing, isType<MNNF>()(multiply(mnf(), npf())))
  is(Nothing, isType<MNNF>()(multiply(mnpf(), nf())))
  is(Nothing, isType<MNPF>()(multiply(mnf(), nnf())))
  is(Nothing, isType<MNPF>()(multiply(mnnf(), nf())))
  is(Nothing, isType<MNF>()(multiply(mnf(), pf())))
  is(Nothing, isType<MNF>()(multiply(mpf(), nf())))
  is(Nothing, isType<MNPF>()(multiply(mnpf(), nnf())))
  is(Nothing, isType<MNPF>()(multiply(mnnf(), npf())))
  is(Nothing, isType<MNPF>()(multiply(mnpf(), pf())))
  is(Nothing, isType<MNPF>()(multiply(mpf(), npf())))
  is(Nothing, isType<MNNF>()(multiply(mnnf(), pf())))
  is(Nothing, isType<MNNF>()(multiply(mpf(), nnf())))

  is(Nothing, isType<MF>()(multiply(f(), mf())))
  is(Nothing, isType<MPF>()(multiply(nf(), mnf())))
  is(Nothing, isType<MNNF>()(multiply(npf(), mnpf())))
  is(Nothing, isType<MNNF>()(multiply(nnf(), mnnf())))
  is(Nothing, isType<MPF>()(multiply(pf(), mpf())))
  is(Nothing, isType<MF>()(multiply(f(), mnf())))
  is(Nothing, isType<MF>()(multiply(nf(), mf())))
  is(Nothing, isType<MF>()(multiply(f(), mnpf())))
  is(Nothing, isType<MF>()(multiply(npf(), mf())))
  is(Nothing, isType<MF>()(multiply(f(), mnnf())))
  is(Nothing, isType<MF>()(multiply(nnf(), mf())))
  is(Nothing, isType<MF>()(multiply(f(), mpf())))
  is(Nothing, isType<MF>()(multiply(pf(), mf())))
  is(Nothing, isType<MNNF>()(multiply(nf(), mnpf())))
  is(Nothing, isType<MNNF>()(multiply(npf(), mnf())))
  is(Nothing, isType<MNPF>()(multiply(nf(), mnnf())))
  is(Nothing, isType<MNPF>()(multiply(nnf(), mnf())))
  is(Nothing, isType<MNF>()(multiply(nf(), mpf())))
  is(Nothing, isType<MNF>()(multiply(pf(), mnf())))
  is(Nothing, isType<MNPF>()(multiply(npf(), mnnf())))
  is(Nothing, isType<MNPF>()(multiply(nnf(), mnpf())))
  is(Nothing, isType<MNPF>()(multiply(npf(), mpf())))
  is(Nothing, isType<MNPF>()(multiply(pf(), mnpf())))
  is(Nothing, isType<MNNF>()(multiply(nnf(), mpf())))
  is(Nothing, isType<MNNF>()(multiply(pf(), mnnf())))

  is(Nothing, isType<Nothing>()(multiply(Nothing, f())))
  is(Nothing, isType<Nothing>()(multiply(Nothing, nf())))
  is(Nothing, isType<Nothing>()(multiply(Nothing, npf())))
  is(Nothing, isType<Nothing>()(multiply(Nothing, nnf())))
  is(Nothing, isType<Nothing>()(multiply(Nothing, pf())))

  is(Nothing, isType<Nothing>()(multiply(Nothing, mf())))
  is(Nothing, isType<Nothing>()(multiply(Nothing, mnf())))
  is(Nothing, isType<Nothing>()(multiply(Nothing, mnpf())))
  is(Nothing, isType<Nothing>()(multiply(Nothing, mnnf())))
  is(Nothing, isType<Nothing>()(multiply(Nothing, mpf())))

  is(Nothing, isType<Nothing>()(multiply(f(), Nothing)))
  is(Nothing, isType<Nothing>()(multiply(nf(), Nothing)))
  is(Nothing, isType<Nothing>()(multiply(npf(), Nothing)))
  is(Nothing, isType<Nothing>()(multiply(nnf(), Nothing)))
  is(Nothing, isType<Nothing>()(multiply(pf(), Nothing)))

  is(Nothing, isType<Nothing>()(multiply(mf(), Nothing)))
  is(Nothing, isType<Nothing>()(multiply(mnf(), Nothing)))
  is(Nothing, isType<Nothing>()(multiply(mnpf(), Nothing)))
  is(Nothing, isType<Nothing>()(multiply(mnnf(), Nothing)))
  is(Nothing, isType<Nothing>()(multiply(mpf(), Nothing)))

  is(Nothing, isType<Nothing>()(multiply(Nothing, Nothing)))

  is(f(8), multiply(pf(2), pf(4)))
  is(f(12), multiply(pf(3), pf(4)))
  is(f(16), multiply(pf(4), pf(4)))
  is(f(20), multiply(pf(5), pf(4)))
  is(f(24), multiply(pf(6), pf(4)))

  is(f(-8), multiply(pf(2), nf(-4)))
  is(f(-12), multiply(pf(3), nf(-4)))
  is(f(-16), multiply(pf(4), nf(-4)))
  is(f(-20), multiply(pf(5), nf(-4)))
  is(f(-24), multiply(pf(6), nf(-4)))

  is(f(-8), multiply(nf(-2), pf(4)))
  is(f(-12), multiply(nf(-3), pf(4)))
  is(f(-16), multiply(nf(-4), pf(4)))
  is(f(-20), multiply(nf(-5), pf(4)))
  is(f(-24), multiply(nf(-6), pf(4)))

  is(f(8), multiply(nf(-2), nf(-4)))
  is(f(12), multiply(nf(-3), nf(-4)))
  is(f(16), multiply(nf(-4), nf(-4)))
  is(f(20), multiply(nf(-5), nf(-4)))
  is(f(24), multiply(nf(-6), nf(-4)))

  is(f(4.930380657631324e-32), multiply(pf(EPSILON), pf(EPSILON)))
  is(f(0), multiply(pf(EPSILON), pf(SMALLEST)))
  is(f(-3.991680619069439e292), multiply(pf(EPSILON), nf(MINIMUM)))
  is(f(3.991680619069439e292), multiply(pf(EPSILON), pf(MAXIMUM)))

  is(f(0), multiply(pf(SMALLEST), pf(EPSILON)))
  is(f(0), multiply(pf(SMALLEST), pf(SMALLEST)))
  is(f(-8.881784197001251e-16), multiply(pf(SMALLEST), nf(MINIMUM)))
  is(f(8.881784197001251e-16), multiply(pf(SMALLEST), pf(MAXIMUM)))

  is(f(-3.991680619069439e292), multiply(nf(MINIMUM), pf(EPSILON)))
  is(f(-8.881784197001251e-16), multiply(nf(MINIMUM), pf(SMALLEST)))
  is(Nothing, multiply(nf(MINIMUM), nf(MINIMUM)))
  is(Nothing, multiply(nf(MINIMUM), pf(MAXIMUM)))

  is(f(3.991680619069439e292), multiply(pf(MAXIMUM), pf(EPSILON)))
  is(f(8.881784197001251e-16), multiply(pf(MAXIMUM), pf(SMALLEST)))
  is(Nothing, multiply(pf(MAXIMUM), nf(MINIMUM)))
  is(Nothing, multiply(pf(MAXIMUM), pf(MAXIMUM)))
})
