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
import { add } from './add.js'

test('add()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(f(f() + f()), isType<MF>()(add(f(), f())))
  is(f(nf() + nf()), isType<MNF>()(add(nf(), nf())))
  is(f(npf() + npf()), isType<MNPF>()(add(npf(), npf())))
  is(f(nnf() + nnf()), isType<MNNF>()(add(nnf(), nnf())))
  is(f(pf() + pf()), isType<MPF>()(add(pf(), pf())))
  is(f(nf() + f()), isType<MF>()(add(f(), nf())))
  is(f(f() + nf()), isType<MF>()(add(nf(), f())))
  is(f(npf() + f()), isType<MF>()(add(f(), npf())))
  is(f(f() + npf()), isType<MF>()(add(npf(), f())))
  is(f(nnf() + f()), isType<MF>()(add(f(), nnf())))
  is(f(f() + nnf()), isType<MF>()(add(nnf(), f())))
  is(f(pf() + f()), isType<MF>()(add(f(), pf())))
  is(f(f() + pf()), isType<MF>()(add(pf(), f())))
  is(f(npf() + nf()), isType<MNF>()(add(nf(), npf())))
  is(f(nf() + npf()), isType<MNF>()(add(npf(), nf())))
  is(f(nnf() + nf()), isType<MF>()(add(nf(), nnf())))
  is(f(nf() + nnf()), isType<MF>()(add(nnf(), nf())))
  is(f(pf() + nf()), isType<MF>()(add(nf(), pf())))
  is(f(nf() + pf()), isType<MF>()(add(pf(), nf())))
  is(f(nnf() + npf()), isType<MF>()(add(npf(), nnf())))
  is(f(npf() + nnf()), isType<MF>()(add(nnf(), npf())))
  is(f(pf() + npf()), isType<MF>()(add(npf(), pf())))
  is(f(npf() + pf()), isType<MF>()(add(pf(), npf())))
  is(f(pf() + nnf()), isType<MPF>()(add(nnf(), pf())))
  is(f(nnf() + pf()), isType<MPF>()(add(pf(), nnf())))

  is(Nothing, isType<MF>()(add(mf(), mf())))
  is(Nothing, isType<MNF>()(add(mnf(), mnf())))
  is(Nothing, isType<MNPF>()(add(mnpf(), mnpf())))
  is(Nothing, isType<MNNF>()(add(mnnf(), mnnf())))
  is(Nothing, isType<MPF>()(add(mpf(), mpf())))
  is(Nothing, isType<MF>()(add(mf(), mnf())))
  is(Nothing, isType<MF>()(add(mnf(), mf())))
  is(Nothing, isType<MF>()(add(mf(), mnpf())))
  is(Nothing, isType<MF>()(add(mnpf(), mf())))
  is(Nothing, isType<MF>()(add(mf(), mnnf())))
  is(Nothing, isType<MF>()(add(mnnf(), mf())))
  is(Nothing, isType<MF>()(add(mf(), mpf())))
  is(Nothing, isType<MF>()(add(mpf(), mf())))
  is(Nothing, isType<MNF>()(add(mnf(), mnpf())))
  is(Nothing, isType<MNF>()(add(mnpf(), mnf())))
  is(Nothing, isType<MF>()(add(mnf(), mnnf())))
  is(Nothing, isType<MF>()(add(mnnf(), mnf())))
  is(Nothing, isType<MF>()(add(mnf(), mpf())))
  is(Nothing, isType<MF>()(add(mpf(), mnf())))
  is(Nothing, isType<MF>()(add(mnpf(), mnnf())))
  is(Nothing, isType<MF>()(add(mnnf(), mnpf())))
  is(Nothing, isType<MF>()(add(mnpf(), mpf())))
  is(Nothing, isType<MF>()(add(mpf(), mnpf())))
  is(Nothing, isType<MPF>()(add(mnnf(), mpf())))
  is(Nothing, isType<MPF>()(add(mpf(), mnnf())))

  is(Nothing, isType<MF>()(add(mf(), f())))
  is(Nothing, isType<MNF>()(add(mnf(), nf())))
  is(Nothing, isType<MNPF>()(add(mnpf(), npf())))
  is(Nothing, isType<MNNF>()(add(mnnf(), nnf())))
  is(Nothing, isType<MPF>()(add(mpf(), pf())))
  is(Nothing, isType<MF>()(add(mf(), nf())))
  is(Nothing, isType<MF>()(add(mnf(), f())))
  is(Nothing, isType<MF>()(add(mf(), npf())))
  is(Nothing, isType<MF>()(add(mnpf(), f())))
  is(Nothing, isType<MF>()(add(mf(), nnf())))
  is(Nothing, isType<MF>()(add(mnnf(), f())))
  is(Nothing, isType<MF>()(add(mf(), pf())))
  is(Nothing, isType<MF>()(add(mpf(), f())))
  is(Nothing, isType<MNF>()(add(mnf(), npf())))
  is(Nothing, isType<MNF>()(add(mnpf(), nf())))
  is(Nothing, isType<MF>()(add(mnf(), nnf())))
  is(Nothing, isType<MF>()(add(mnnf(), nf())))
  is(Nothing, isType<MF>()(add(mnf(), pf())))
  is(Nothing, isType<MF>()(add(mpf(), nf())))
  is(Nothing, isType<MF>()(add(mnpf(), nnf())))
  is(Nothing, isType<MF>()(add(mnnf(), npf())))
  is(Nothing, isType<MF>()(add(mnpf(), pf())))
  is(Nothing, isType<MF>()(add(mpf(), npf())))
  is(Nothing, isType<MPF>()(add(mnnf(), pf())))
  is(Nothing, isType<MPF>()(add(mpf(), nnf())))

  is(Nothing, isType<MF>()(add(f(), mf())))
  is(Nothing, isType<MNF>()(add(nf(), mnf())))
  is(Nothing, isType<MNPF>()(add(npf(), mnpf())))
  is(Nothing, isType<MNNF>()(add(nnf(), mnnf())))
  is(Nothing, isType<MPF>()(add(pf(), mpf())))
  is(Nothing, isType<MF>()(add(f(), mnf())))
  is(Nothing, isType<MF>()(add(nf(), mf())))
  is(Nothing, isType<MF>()(add(f(), mnpf())))
  is(Nothing, isType<MF>()(add(npf(), mf())))
  is(Nothing, isType<MF>()(add(f(), mnnf())))
  is(Nothing, isType<MF>()(add(nnf(), mf())))
  is(Nothing, isType<MF>()(add(f(), mpf())))
  is(Nothing, isType<MF>()(add(pf(), mf())))
  is(Nothing, isType<MNF>()(add(nf(), mnpf())))
  is(Nothing, isType<MNF>()(add(npf(), mnf())))
  is(Nothing, isType<MF>()(add(nf(), mnnf())))
  is(Nothing, isType<MF>()(add(nnf(), mnf())))
  is(Nothing, isType<MF>()(add(nf(), mpf())))
  is(Nothing, isType<MF>()(add(pf(), mnf())))
  is(Nothing, isType<MF>()(add(npf(), mnnf())))
  is(Nothing, isType<MF>()(add(nnf(), mnpf())))
  is(Nothing, isType<MF>()(add(npf(), mpf())))
  is(Nothing, isType<MF>()(add(pf(), mnpf())))
  is(Nothing, isType<MPF>()(add(nnf(), mpf())))
  is(Nothing, isType<MPF>()(add(pf(), mnnf())))

  is(Nothing, isType<Nothing>()(add(Nothing, f())))
  is(Nothing, isType<Nothing>()(add(Nothing, nf())))
  is(Nothing, isType<Nothing>()(add(Nothing, npf())))
  is(Nothing, isType<Nothing>()(add(Nothing, nnf())))
  is(Nothing, isType<Nothing>()(add(Nothing, pf())))

  is(Nothing, isType<Nothing>()(add(Nothing, mf())))
  is(Nothing, isType<Nothing>()(add(Nothing, mnf())))
  is(Nothing, isType<Nothing>()(add(Nothing, mnpf())))
  is(Nothing, isType<Nothing>()(add(Nothing, mnnf())))
  is(Nothing, isType<Nothing>()(add(Nothing, mpf())))

  is(Nothing, isType<Nothing>()(add(f(), Nothing)))
  is(Nothing, isType<Nothing>()(add(nf(), Nothing)))
  is(Nothing, isType<Nothing>()(add(npf(), Nothing)))
  is(Nothing, isType<Nothing>()(add(nnf(), Nothing)))
  is(Nothing, isType<Nothing>()(add(pf(), Nothing)))

  is(Nothing, isType<Nothing>()(add(mf(), Nothing)))
  is(Nothing, isType<Nothing>()(add(mnf(), Nothing)))
  is(Nothing, isType<Nothing>()(add(mnpf(), Nothing)))
  is(Nothing, isType<Nothing>()(add(mnnf(), Nothing)))
  is(Nothing, isType<Nothing>()(add(mpf(), Nothing)))

  is(Nothing, isType<Nothing>()(add(Nothing, Nothing)))

  is(f(6), add(pf(2), pf(4)))
  is(f(7), add(pf(3), pf(4)))
  is(f(8), add(pf(4), pf(4)))
  is(f(9), add(pf(5), pf(4)))
  is(f(10), add(pf(6), pf(4)))

  is(f(-2), add(pf(2), nf(-4)))
  is(f(-1), add(pf(3), nf(-4)))
  is(f(0), add(pf(4), nf(-4)))
  is(f(1), add(pf(5), nf(-4)))
  is(f(2), add(pf(6), nf(-4)))

  is(f(2), add(nf(-2), pf(4)))
  is(f(1), add(nf(-3), pf(4)))
  is(f(0), add(nf(-4), pf(4)))
  is(f(-1), add(nf(-5), pf(4)))
  is(f(-2), add(nf(-6), pf(4)))

  is(f(-6), add(nf(-2), nf(-4)))
  is(f(-7), add(nf(-3), nf(-4)))
  is(f(-8), add(nf(-4), nf(-4)))
  is(f(-9), add(nf(-5), nf(-4)))
  is(f(-10), add(nf(-6), nf(-4)))

  is(f(4.440892098500626e-16), add(pf(EPSILON), pf(EPSILON)))
  is(f(2.220446049250313e-16), add(pf(EPSILON), pf(SMALLEST)))
  is(f(-1.7976931348623157e308), add(pf(EPSILON), nf(MINIMUM)))
  is(f(1.7976931348623157e308), add(pf(EPSILON), pf(MAXIMUM)))

  is(f(2.220446049250313e-16), add(pf(SMALLEST), pf(EPSILON)))
  is(f(1e-323), add(pf(SMALLEST), pf(SMALLEST)))
  is(f(-1.7976931348623157e308), add(pf(SMALLEST), nf(MINIMUM)))
  is(f(1.7976931348623157e308), add(pf(SMALLEST), pf(MAXIMUM)))

  is(f(-1.7976931348623157e308), add(nf(MINIMUM), pf(EPSILON)))
  is(f(-1.7976931348623157e308), add(nf(MINIMUM), pf(SMALLEST)))
  is(Nothing, add(nf(MINIMUM), nf(MINIMUM)))
  is(f(0), add(nf(MINIMUM), pf(MAXIMUM)))

  is(f(1.7976931348623157e308), add(pf(MAXIMUM), pf(EPSILON)))
  is(f(1.7976931348623157e308), add(pf(MAXIMUM), pf(SMALLEST)))
  is(f(0), add(pf(MAXIMUM), nf(MINIMUM)))
  is(Nothing, add(pf(MAXIMUM), pf(MAXIMUM)))
})
