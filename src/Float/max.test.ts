import test from 'ava'
import {
  F,
  NF,
  NPF,
  NNF,
  PF,
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
import { max } from './max.js'

test('max()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(f(2), isType<F>()(max(f(1), f(2))))
  is(nf(-1), isType<NF>()(max(nf(-1), nf(-2))))
  is(npf(0), isType<NPF>()(max(npf(0), npf(-1))))
  is(nnf(1), isType<NNF>()(max(nnf(0), nnf(1))))
  is(pf(2), isType<PF>()(max(pf(1), pf(2))))
  is(f(1), isType<F>()(max(f(1), nf(-1))))
  is(f(1), isType<F>()(max(nf(-1), f(1))))
  is(f(1), isType<F>()(max(f(1), npf(0))))
  is(f(1), isType<F>()(max(npf(0), f(1))))
  is(nnf(0), isType<NNF>()(max(f(-1), nnf(0))))
  is(nnf(0), isType<NNF>()(max(nnf(0), f(-1))))
  is(pf(1), isType<PF>()(max(f(-1), pf(1))))
  is(pf(1), isType<PF>()(max(pf(1), f(-1))))
  is(npf(0), isType<NPF>()(max(nf(-1), npf(0))))
  is(npf(0), isType<NPF>()(max(npf(0), nf(-1))))
  is(nnf(0), isType<NNF>()(max(nf(-1), nnf(0))))
  is(nnf(0), isType<NNF>()(max(nnf(0), nf(-1))))
  is(pf(1), isType<PF>()(max(nf(-1), pf(1))))
  is(pf(1), isType<PF>()(max(pf(1), nf(-1))))
  is(nnf(1), isType<NNF>()(max(npf(-1), nnf(1))))
  is(nnf(1), isType<NNF>()(max(nnf(1), npf(-1))))
  is(pf(1), isType<PF>()(max(npf(0), pf(1))))
  is(pf(1), isType<PF>()(max(pf(1), npf(0))))
  is(pf(1), isType<PF>()(max(nnf(0), pf(1))))
  is(pf(1), isType<PF>()(max(pf(1), nnf(0))))

  is(f(2), isType<MF>()(max(mf(1), mf(2))))
  is(nf(-1), isType<MNF>()(max(mnf(-1), mnf(-2))))
  is(npf(0), isType<MNPF>()(max(mnpf(0), mnpf(-1))))
  is(nnf(1), isType<MNNF>()(max(mnnf(0), mnnf(1))))
  is(pf(2), isType<MPF>()(max(mpf(1), mpf(2))))
  is(f(1), isType<MF>()(max(mf(1), mnf(-1))))
  is(f(1), isType<MF>()(max(mnf(-1), mf(1))))
  is(f(1), isType<MF>()(max(mf(1), mnpf(0))))
  is(f(1), isType<MF>()(max(mnpf(0), mf(1))))
  is(nnf(0), isType<MNNF>()(max(mf(-1), mnnf(0))))
  is(nnf(0), isType<MNNF>()(max(mnnf(0), mf(-1))))
  is(pf(1), isType<MPF>()(max(mf(-1), mpf(1))))
  is(pf(1), isType<MPF>()(max(mpf(1), mf(-1))))
  is(npf(0), isType<MNPF>()(max(mnf(-1), mnpf(0))))
  is(npf(0), isType<MNPF>()(max(mnpf(0), mnf(-1))))
  is(nnf(0), isType<MNNF>()(max(mnf(-1), mnnf(0))))
  is(nnf(0), isType<MNNF>()(max(mnnf(0), mnf(-1))))
  is(pf(1), isType<MPF>()(max(mnf(-1), mpf(1))))
  is(pf(1), isType<MPF>()(max(mpf(1), mnf(-1))))
  is(nnf(1), isType<MNNF>()(max(mnpf(-1), mnnf(1))))
  is(nnf(1), isType<MNNF>()(max(mnnf(1), mnpf(-1))))
  is(pf(1), isType<MPF>()(max(mnpf(0), mpf(1))))
  is(pf(1), isType<MPF>()(max(mpf(1), mnpf(0))))
  is(pf(1), isType<MPF>()(max(mnnf(0), mpf(1))))
  is(pf(1), isType<MPF>()(max(mpf(1), mnnf(0))))

  is(f(2), isType<MF>()(max(mf(1), f(2))))
  is(nf(-1), isType<MNF>()(max(mnf(-1), nf(-2))))
  is(npf(0), isType<MNPF>()(max(mnpf(0), npf(-1))))
  is(nnf(1), isType<MNNF>()(max(mnnf(0), nnf(1))))
  is(pf(2), isType<MPF>()(max(mpf(1), pf(2))))
  is(f(1), isType<MF>()(max(mf(1), nf(-1))))
  is(f(1), isType<MF>()(max(mnf(-1), f(1))))
  is(f(1), isType<MF>()(max(mf(1), npf(0))))
  is(f(1), isType<MF>()(max(mnpf(0), f(1))))
  is(nnf(0), isType<MNNF>()(max(mf(-1), nnf(0))))
  is(nnf(0), isType<MNNF>()(max(mnnf(0), f(-1))))
  is(pf(1), isType<MPF>()(max(mf(-1), pf(1))))
  is(pf(1), isType<MPF>()(max(mpf(1), f(-1))))
  is(npf(0), isType<MNPF>()(max(mnf(-1), npf(0))))
  is(npf(0), isType<MNPF>()(max(mnpf(0), nf(-1))))
  is(nnf(0), isType<MNNF>()(max(mnf(-1), nnf(0))))
  is(nnf(0), isType<MNNF>()(max(mnnf(0), nf(-1))))
  is(pf(1), isType<MPF>()(max(mnf(-1), pf(1))))
  is(pf(1), isType<MPF>()(max(mpf(1), nf(-1))))
  is(nnf(1), isType<MNNF>()(max(mnpf(-1), nnf(1))))
  is(nnf(1), isType<MNNF>()(max(mnnf(1), npf(-1))))
  is(pf(1), isType<MPF>()(max(mnpf(0), pf(1))))
  is(pf(1), isType<MPF>()(max(mpf(1), npf(0))))
  is(pf(1), isType<MPF>()(max(mnnf(0), pf(1))))
  is(pf(1), isType<MPF>()(max(mpf(1), nnf(0))))

  is(f(2), isType<MF>()(max(f(1), mf(2))))
  is(nf(-1), isType<MNF>()(max(nf(-1), mnf(-2))))
  is(npf(0), isType<MNPF>()(max(npf(0), mnpf(-1))))
  is(nnf(1), isType<MNNF>()(max(nnf(0), mnnf(1))))
  is(pf(2), isType<MPF>()(max(pf(1), mpf(2))))
  is(f(1), isType<MF>()(max(f(1), mnf(-1))))
  is(f(1), isType<MF>()(max(nf(-1), mf(1))))
  is(f(1), isType<MF>()(max(f(1), mnpf(0))))
  is(f(1), isType<MF>()(max(npf(0), mf(1))))
  is(nnf(0), isType<MNNF>()(max(f(-1), mnnf(0))))
  is(nnf(0), isType<MNNF>()(max(nnf(0), mf(-1))))
  is(pf(1), isType<MPF>()(max(f(-1), mpf(1))))
  is(pf(1), isType<MPF>()(max(pf(1), mf(-1))))
  is(npf(0), isType<MNPF>()(max(nf(-1), mnpf(0))))
  is(npf(0), isType<MNPF>()(max(npf(0), mnf(-1))))
  is(nnf(0), isType<MNNF>()(max(nf(-1), mnnf(0))))
  is(nnf(0), isType<MNNF>()(max(nnf(0), mnf(-1))))
  is(pf(1), isType<MPF>()(max(nf(-1), mpf(1))))
  is(pf(1), isType<MPF>()(max(pf(1), mnf(-1))))
  is(nnf(1), isType<MNNF>()(max(npf(-1), mnnf(1))))
  is(nnf(1), isType<MNNF>()(max(nnf(1), mnpf(-1))))
  is(pf(1), isType<MPF>()(max(npf(0), mpf(1))))
  is(pf(1), isType<MPF>()(max(pf(1), mnpf(0))))
  is(pf(1), isType<MPF>()(max(nnf(0), mpf(1))))
  is(pf(1), isType<MPF>()(max(pf(1), mnnf(0))))

  is(Nothing, isType<Nothing>()(max(Nothing, f())))
  is(Nothing, isType<Nothing>()(max(Nothing, nf())))
  is(Nothing, isType<Nothing>()(max(Nothing, npf())))
  is(Nothing, isType<Nothing>()(max(Nothing, nnf())))
  is(Nothing, isType<Nothing>()(max(Nothing, pf())))

  is(Nothing, isType<Nothing>()(max(Nothing, mf())))
  is(Nothing, isType<Nothing>()(max(Nothing, mnf())))
  is(Nothing, isType<Nothing>()(max(Nothing, mnpf())))
  is(Nothing, isType<Nothing>()(max(Nothing, mnnf())))
  is(Nothing, isType<Nothing>()(max(Nothing, mpf())))

  is(Nothing, isType<Nothing>()(max(f(), Nothing)))
  is(Nothing, isType<Nothing>()(max(nf(), Nothing)))
  is(Nothing, isType<Nothing>()(max(npf(), Nothing)))
  is(Nothing, isType<Nothing>()(max(nnf(), Nothing)))
  is(Nothing, isType<Nothing>()(max(pf(), Nothing)))

  is(Nothing, isType<Nothing>()(max(mf(), Nothing)))
  is(Nothing, isType<Nothing>()(max(mnf(), Nothing)))
  is(Nothing, isType<Nothing>()(max(mnpf(), Nothing)))
  is(Nothing, isType<Nothing>()(max(mnnf(), Nothing)))
  is(Nothing, isType<Nothing>()(max(mpf(), Nothing)))

  is(Nothing, isType<Nothing>()(max(Nothing, Nothing)))
})
