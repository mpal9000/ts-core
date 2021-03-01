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
import { subtract } from './subtract.js'

test('subtract()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(f(f() - f()), isType<MF>()(subtract(f(), f())))
  is(f(nf() - nf()), isType<MF>()(subtract(nf(), nf())))
  is(f(npf() - npf()), isType<MF>()(subtract(npf(), npf())))
  is(f(nnf() - nnf()), isType<MF>()(subtract(nnf(), nnf())))
  is(f(pf() - pf()), isType<MF>()(subtract(pf(), pf())))
  is(f(nf() - f()), isType<MF>()(subtract(f(), nf())))
  is(f(f() - nf()), isType<MF>()(subtract(nf(), f())))
  is(f(npf() - f()), isType<MF>()(subtract(f(), npf())))
  is(f(f() - npf()), isType<MF>()(subtract(npf(), f())))
  is(f(nnf() - f()), isType<MF>()(subtract(f(), nnf())))
  is(f(f() - nnf()), isType<MF>()(subtract(nnf(), f())))
  is(f(pf() - f()), isType<MF>()(subtract(f(), pf())))
  is(f(f() - pf()), isType<MF>()(subtract(pf(), f())))
  is(f(npf() - nf()), isType<MF>()(subtract(nf(), npf())))
  is(f(nf() - npf()), isType<MF>()(subtract(npf(), nf())))
  is(f(nnf() - nf()), isType<MPF>()(subtract(nf(), nnf())))
  is(f(nf() - nnf()), isType<MNF>()(subtract(nnf(), nf())))
  is(f(pf() - nf()), isType<MPF>()(subtract(nf(), pf())))
  is(f(nf() - pf()), isType<MNF>()(subtract(pf(), nf())))
  is(f(nnf() - npf()), isType<MNNF>()(subtract(npf(), nnf())))
  is(f(npf() - nnf()), isType<MNPF>()(subtract(nnf(), npf())))
  is(f(pf() - npf()), isType<MPF>()(subtract(npf(), pf())))
  is(f(npf() - pf()), isType<MNF>()(subtract(pf(), npf())))
  is(f(pf() - nnf()), isType<MF>()(subtract(nnf(), pf())))
  is(f(nnf() - pf()), isType<MF>()(subtract(pf(), nnf())))

  is(Nothing, isType<MF>()(subtract(mf(), mf())))
  is(Nothing, isType<MF>()(subtract(mnf(), mnf())))
  is(Nothing, isType<MF>()(subtract(mnpf(), mnpf())))
  is(Nothing, isType<MF>()(subtract(mnnf(), mnnf())))
  is(Nothing, isType<MF>()(subtract(mpf(), mpf())))
  is(Nothing, isType<MF>()(subtract(mf(), mnf())))
  is(Nothing, isType<MF>()(subtract(mnf(), mf())))
  is(Nothing, isType<MF>()(subtract(mf(), mnpf())))
  is(Nothing, isType<MF>()(subtract(mnpf(), mf())))
  is(Nothing, isType<MF>()(subtract(mf(), mnnf())))
  is(Nothing, isType<MF>()(subtract(mnnf(), mf())))
  is(Nothing, isType<MF>()(subtract(mf(), mpf())))
  is(Nothing, isType<MF>()(subtract(mpf(), mf())))
  is(Nothing, isType<MF>()(subtract(mnf(), mnpf())))
  is(Nothing, isType<MF>()(subtract(mnpf(), mnf())))
  is(Nothing, isType<MPF>()(subtract(mnf(), mnnf())))
  is(Nothing, isType<MNF>()(subtract(mnnf(), mnf())))
  is(Nothing, isType<MPF>()(subtract(mnf(), mpf())))
  is(Nothing, isType<MNF>()(subtract(mpf(), mnf())))
  is(Nothing, isType<MNNF>()(subtract(mnpf(), mnnf())))
  is(Nothing, isType<MNPF>()(subtract(mnnf(), mnpf())))
  is(Nothing, isType<MPF>()(subtract(mnpf(), mpf())))
  is(Nothing, isType<MNF>()(subtract(mpf(), mnpf())))
  is(Nothing, isType<MF>()(subtract(mnnf(), mpf())))
  is(Nothing, isType<MF>()(subtract(mpf(), mnnf())))

  is(Nothing, isType<MF>()(subtract(mf(), f())))
  is(Nothing, isType<MF>()(subtract(mnf(), nf())))
  is(Nothing, isType<MF>()(subtract(mnpf(), npf())))
  is(Nothing, isType<MF>()(subtract(mnnf(), nnf())))
  is(Nothing, isType<MF>()(subtract(mpf(), pf())))
  is(Nothing, isType<MF>()(subtract(mf(), nf())))
  is(Nothing, isType<MF>()(subtract(mnf(), f())))
  is(Nothing, isType<MF>()(subtract(mf(), npf())))
  is(Nothing, isType<MF>()(subtract(mnpf(), f())))
  is(Nothing, isType<MF>()(subtract(mf(), nnf())))
  is(Nothing, isType<MF>()(subtract(mnnf(), f())))
  is(Nothing, isType<MF>()(subtract(mf(), pf())))
  is(Nothing, isType<MF>()(subtract(mpf(), f())))
  is(Nothing, isType<MF>()(subtract(mnf(), npf())))
  is(Nothing, isType<MF>()(subtract(mnpf(), nf())))
  is(Nothing, isType<MPF>()(subtract(mnf(), nnf())))
  is(Nothing, isType<MNF>()(subtract(mnnf(), nf())))
  is(Nothing, isType<MPF>()(subtract(mnf(), pf())))
  is(Nothing, isType<MNF>()(subtract(mpf(), nf())))
  is(Nothing, isType<MNNF>()(subtract(mnpf(), nnf())))
  is(Nothing, isType<MNPF>()(subtract(mnnf(), npf())))
  is(Nothing, isType<MPF>()(subtract(mnpf(), pf())))
  is(Nothing, isType<MNF>()(subtract(mpf(), npf())))
  is(Nothing, isType<MF>()(subtract(mnnf(), pf())))
  is(Nothing, isType<MF>()(subtract(mpf(), nnf())))

  is(Nothing, isType<MF>()(subtract(f(), mf())))
  is(Nothing, isType<MF>()(subtract(nf(), mnf())))
  is(Nothing, isType<MF>()(subtract(npf(), mnpf())))
  is(Nothing, isType<MF>()(subtract(nnf(), mnnf())))
  is(Nothing, isType<MF>()(subtract(pf(), mpf())))
  is(Nothing, isType<MF>()(subtract(f(), mnf())))
  is(Nothing, isType<MF>()(subtract(nf(), mf())))
  is(Nothing, isType<MF>()(subtract(f(), mnpf())))
  is(Nothing, isType<MF>()(subtract(npf(), mf())))
  is(Nothing, isType<MF>()(subtract(f(), mnnf())))
  is(Nothing, isType<MF>()(subtract(nnf(), mf())))
  is(Nothing, isType<MF>()(subtract(f(), mpf())))
  is(Nothing, isType<MF>()(subtract(pf(), mf())))
  is(Nothing, isType<MF>()(subtract(nf(), mnpf())))
  is(Nothing, isType<MF>()(subtract(npf(), mnf())))
  is(Nothing, isType<MPF>()(subtract(nf(), mnnf())))
  is(Nothing, isType<MNF>()(subtract(nnf(), mnf())))
  is(Nothing, isType<MPF>()(subtract(nf(), mpf())))
  is(Nothing, isType<MNF>()(subtract(pf(), mnf())))
  is(Nothing, isType<MNNF>()(subtract(npf(), mnnf())))
  is(Nothing, isType<MNPF>()(subtract(nnf(), mnpf())))
  is(Nothing, isType<MPF>()(subtract(npf(), mpf())))
  is(Nothing, isType<MNF>()(subtract(pf(), mnpf())))
  is(Nothing, isType<MF>()(subtract(nnf(), mpf())))
  is(Nothing, isType<MF>()(subtract(pf(), mnnf())))

  is(Nothing, isType<Nothing>()(subtract(Nothing, f())))
  is(Nothing, isType<Nothing>()(subtract(Nothing, nf())))
  is(Nothing, isType<Nothing>()(subtract(Nothing, npf())))
  is(Nothing, isType<Nothing>()(subtract(Nothing, nnf())))
  is(Nothing, isType<Nothing>()(subtract(Nothing, pf())))

  is(Nothing, isType<Nothing>()(subtract(Nothing, mf())))
  is(Nothing, isType<Nothing>()(subtract(Nothing, mnf())))
  is(Nothing, isType<Nothing>()(subtract(Nothing, mnpf())))
  is(Nothing, isType<Nothing>()(subtract(Nothing, mnnf())))
  is(Nothing, isType<Nothing>()(subtract(Nothing, mpf())))

  is(Nothing, isType<Nothing>()(subtract(f(), Nothing)))
  is(Nothing, isType<Nothing>()(subtract(nf(), Nothing)))
  is(Nothing, isType<Nothing>()(subtract(npf(), Nothing)))
  is(Nothing, isType<Nothing>()(subtract(nnf(), Nothing)))
  is(Nothing, isType<Nothing>()(subtract(pf(), Nothing)))

  is(Nothing, isType<Nothing>()(subtract(mf(), Nothing)))
  is(Nothing, isType<Nothing>()(subtract(mnf(), Nothing)))
  is(Nothing, isType<Nothing>()(subtract(mnpf(), Nothing)))
  is(Nothing, isType<Nothing>()(subtract(mnnf(), Nothing)))
  is(Nothing, isType<Nothing>()(subtract(mpf(), Nothing)))

  is(Nothing, isType<Nothing>()(subtract(Nothing, Nothing)))

  is(f(2), subtract(pf(2), pf(4)))
  is(f(1), subtract(pf(3), pf(4)))
  is(f(0), subtract(pf(4), pf(4)))
  is(f(-1), subtract(pf(5), pf(4)))
  is(f(-2), subtract(pf(6), pf(4)))

  is(f(-6), subtract(pf(2), nf(-4)))
  is(f(-7), subtract(pf(3), nf(-4)))
  is(f(-8), subtract(pf(4), nf(-4)))
  is(f(-9), subtract(pf(5), nf(-4)))
  is(f(-10), subtract(pf(6), nf(-4)))

  is(f(6), subtract(nf(-2), pf(4)))
  is(f(7), subtract(nf(-3), pf(4)))
  is(f(8), subtract(nf(-4), pf(4)))
  is(f(9), subtract(nf(-5), pf(4)))
  is(f(10), subtract(nf(-6), pf(4)))

  is(f(-2), subtract(nf(-2), nf(-4)))
  is(f(-1), subtract(nf(-3), nf(-4)))
  is(f(0), subtract(nf(-4), nf(-4)))
  is(f(1), subtract(nf(-5), nf(-4)))
  is(f(2), subtract(nf(-6), nf(-4)))

  is(f(0), subtract(pf(EPSILON), pf(EPSILON)))
  is(f(-2.220446049250313e-16), subtract(pf(EPSILON), pf(SMALLEST)))
  is(f(-1.7976931348623157e308), subtract(pf(EPSILON), nf(MINIMUM)))
  is(f(1.7976931348623157e308), subtract(pf(EPSILON), pf(MAXIMUM)))

  is(f(2.220446049250313e-16), subtract(pf(SMALLEST), pf(EPSILON)))
  is(f(0), subtract(pf(SMALLEST), pf(SMALLEST)))
  is(f(-1.7976931348623157e308), subtract(pf(SMALLEST), nf(MINIMUM)))
  is(f(1.7976931348623157e308), subtract(pf(SMALLEST), pf(MAXIMUM)))

  is(f(1.7976931348623157e308), subtract(nf(MINIMUM), pf(EPSILON)))
  is(f(1.7976931348623157e308), subtract(nf(MINIMUM), pf(SMALLEST)))
  is(f(0), subtract(nf(MINIMUM), nf(MINIMUM)))
  is(Nothing, subtract(nf(MINIMUM), pf(MAXIMUM)))

  is(f(-1.7976931348623157e308), subtract(pf(MAXIMUM), pf(EPSILON)))
  is(f(-1.7976931348623157e308), subtract(pf(MAXIMUM), pf(SMALLEST)))
  is(Nothing, subtract(pf(MAXIMUM), nf(MINIMUM)))
  is(f(0), subtract(pf(MAXIMUM), pf(MAXIMUM)))
})
