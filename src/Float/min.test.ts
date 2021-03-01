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
import { min } from './min.js'

test('min()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(f(1), isType<F>()(min(f(1), f(2))))
  is(nf(-2), isType<NF>()(min(nf(-1), nf(-2))))
  is(npf(-1), isType<NPF>()(min(npf(0), npf(-1))))
  is(nnf(0), isType<NNF>()(min(nnf(0), nnf(1))))
  is(pf(1), isType<PF>()(min(pf(1), pf(2))))
  is(nf(-1), isType<NF>()(min(f(1), nf(-1))))
  is(nf(-1), isType<NF>()(min(nf(-1), f(1))))
  is(npf(0), isType<NPF>()(min(f(1), npf(0))))
  is(npf(0), isType<NPF>()(min(npf(0), f(1))))
  is(f(-1), isType<F>()(min(f(-1), nnf(0))))
  is(f(-1), isType<F>()(min(nnf(0), f(-1))))
  is(f(-1), isType<F>()(min(f(-1), pf(1))))
  is(f(-1), isType<F>()(min(pf(1), f(-1))))
  is(nf(-1), isType<NF>()(min(nf(-1), npf(0))))
  is(nf(-1), isType<NF>()(min(npf(0), nf(-1))))
  is(nf(-1), isType<NF>()(min(nf(-1), nnf(0))))
  is(nf(-1), isType<NF>()(min(nnf(0), nf(-1))))
  is(nf(-1), isType<NF>()(min(nf(-1), pf(1))))
  is(nf(-1), isType<NF>()(min(pf(1), nf(-1))))
  is(npf(-1), isType<NPF>()(min(npf(-1), nnf(1))))
  is(npf(-1), isType<NPF>()(min(nnf(1), npf(-1))))
  is(npf(0), isType<NPF>()(min(npf(0), pf(1))))
  is(npf(0), isType<NPF>()(min(pf(1), npf(0))))
  is(nnf(0), isType<NNF>()(min(nnf(0), pf(1))))
  is(nnf(0), isType<NNF>()(min(pf(1), nnf(0))))

  is(f(1), isType<MF>()(min(mf(1), mf(2))))
  is(nf(-2), isType<MNF>()(min(mnf(-1), mnf(-2))))
  is(npf(-1), isType<MNPF>()(min(mnpf(0), mnpf(-1))))
  is(nnf(0), isType<MNNF>()(min(mnnf(0), mnnf(1))))
  is(pf(1), isType<MPF>()(min(mpf(1), mpf(2))))
  is(nf(-1), isType<MNF>()(min(mf(1), mnf(-1))))
  is(nf(-1), isType<MNF>()(min(mnf(-1), mf(1))))
  is(npf(0), isType<MNPF>()(min(mf(1), mnpf(0))))
  is(npf(0), isType<MNPF>()(min(mnpf(0), mf(1))))
  is(f(-1), isType<MF>()(min(mf(-1), mnnf(0))))
  is(f(-1), isType<MF>()(min(mnnf(0), mf(-1))))
  is(f(-1), isType<MF>()(min(mf(-1), mpf(1))))
  is(f(-1), isType<MF>()(min(mpf(1), mf(-1))))
  is(nf(-1), isType<MNF>()(min(mnf(-1), mnpf(0))))
  is(nf(-1), isType<MNF>()(min(mnpf(0), mnf(-1))))
  is(nf(-1), isType<MNF>()(min(mnf(-1), mnnf(0))))
  is(nf(-1), isType<MNF>()(min(mnnf(0), mnf(-1))))
  is(nf(-1), isType<MNF>()(min(mnf(-1), mpf(1))))
  is(nf(-1), isType<MNF>()(min(mpf(1), mnf(-1))))
  is(npf(-1), isType<MNPF>()(min(mnpf(-1), mnnf(1))))
  is(npf(-1), isType<MNPF>()(min(mnnf(1), mnpf(-1))))
  is(npf(0), isType<MNPF>()(min(mnpf(0), mpf(1))))
  is(npf(0), isType<MNPF>()(min(mpf(1), mnpf(0))))
  is(nnf(0), isType<MNNF>()(min(mnnf(0), mpf(1))))
  is(nnf(0), isType<MNNF>()(min(mpf(1), mnnf(0))))

  is(f(1), isType<MF>()(min(mf(1), f(2))))
  is(nf(-2), isType<MNF>()(min(mnf(-1), nf(-2))))
  is(npf(-1), isType<MNPF>()(min(mnpf(0), npf(-1))))
  is(nnf(0), isType<MNNF>()(min(mnnf(0), nnf(1))))
  is(pf(1), isType<MPF>()(min(mpf(1), pf(2))))
  is(nf(-1), isType<MNF>()(min(mf(1), nf(-1))))
  is(nf(-1), isType<MNF>()(min(mnf(-1), f(1))))
  is(npf(0), isType<MNPF>()(min(mf(1), npf(0))))
  is(npf(0), isType<MNPF>()(min(mnpf(0), f(1))))
  is(f(-1), isType<MF>()(min(mf(-1), nnf(0))))
  is(f(-1), isType<MF>()(min(mnnf(0), f(-1))))
  is(f(-1), isType<MF>()(min(mf(-1), pf(1))))
  is(f(-1), isType<MF>()(min(mpf(1), f(-1))))
  is(nf(-1), isType<MNF>()(min(mnf(-1), npf(0))))
  is(nf(-1), isType<MNF>()(min(mnpf(0), nf(-1))))
  is(nf(-1), isType<MNF>()(min(mnf(-1), nnf(0))))
  is(nf(-1), isType<MNF>()(min(mnnf(0), nf(-1))))
  is(nf(-1), isType<MNF>()(min(mnf(-1), pf(1))))
  is(nf(-1), isType<MNF>()(min(mpf(1), nf(-1))))
  is(npf(-1), isType<MNPF>()(min(mnpf(-1), nnf(1))))
  is(npf(-1), isType<MNPF>()(min(mnnf(1), npf(-1))))
  is(npf(0), isType<MNPF>()(min(mnpf(0), pf(1))))
  is(npf(0), isType<MNPF>()(min(mpf(1), npf(0))))
  is(nnf(0), isType<MNNF>()(min(mnnf(0), pf(1))))
  is(nnf(0), isType<MNNF>()(min(mpf(1), nnf(0))))

  is(f(1), isType<MF>()(min(f(1), mf(2))))
  is(nf(-2), isType<MNF>()(min(nf(-1), mnf(-2))))
  is(npf(-1), isType<MNPF>()(min(npf(0), mnpf(-1))))
  is(nnf(0), isType<MNNF>()(min(nnf(0), mnnf(1))))
  is(pf(1), isType<MPF>()(min(pf(1), mpf(2))))
  is(nf(-1), isType<MNF>()(min(f(1), mnf(-1))))
  is(nf(-1), isType<MNF>()(min(nf(-1), mf(1))))
  is(npf(0), isType<MNPF>()(min(f(1), mnpf(0))))
  is(npf(0), isType<MNPF>()(min(npf(0), mf(1))))
  is(f(-1), isType<MF>()(min(f(-1), mnnf(0))))
  is(f(-1), isType<MF>()(min(nnf(0), mf(-1))))
  is(f(-1), isType<MF>()(min(f(-1), mpf(1))))
  is(f(-1), isType<MF>()(min(pf(1), mf(-1))))
  is(nf(-1), isType<MNF>()(min(nf(-1), mnpf(0))))
  is(nf(-1), isType<MNF>()(min(npf(0), mnf(-1))))
  is(nf(-1), isType<MNF>()(min(nf(-1), mnnf(0))))
  is(nf(-1), isType<MNF>()(min(nnf(0), mnf(-1))))
  is(nf(-1), isType<MNF>()(min(nf(-1), mpf(1))))
  is(nf(-1), isType<MNF>()(min(pf(1), mnf(-1))))
  is(npf(-1), isType<MNPF>()(min(npf(-1), mnnf(1))))
  is(npf(-1), isType<MNPF>()(min(nnf(1), mnpf(-1))))
  is(npf(0), isType<MNPF>()(min(npf(0), mpf(1))))
  is(npf(0), isType<MNPF>()(min(pf(1), mnpf(0))))
  is(nnf(0), isType<MNNF>()(min(nnf(0), mpf(1))))
  is(nnf(0), isType<MNNF>()(min(pf(1), mnnf(0))))

  is(Nothing, isType<Nothing>()(min(Nothing, f())))
  is(Nothing, isType<Nothing>()(min(Nothing, nf())))
  is(Nothing, isType<Nothing>()(min(Nothing, npf())))
  is(Nothing, isType<Nothing>()(min(Nothing, nnf())))
  is(Nothing, isType<Nothing>()(min(Nothing, pf())))

  is(Nothing, isType<Nothing>()(min(Nothing, mf())))
  is(Nothing, isType<Nothing>()(min(Nothing, mnf())))
  is(Nothing, isType<Nothing>()(min(Nothing, mnpf())))
  is(Nothing, isType<Nothing>()(min(Nothing, mnnf())))
  is(Nothing, isType<Nothing>()(min(Nothing, mpf())))

  is(Nothing, isType<Nothing>()(min(f(), Nothing)))
  is(Nothing, isType<Nothing>()(min(nf(), Nothing)))
  is(Nothing, isType<Nothing>()(min(npf(), Nothing)))
  is(Nothing, isType<Nothing>()(min(nnf(), Nothing)))
  is(Nothing, isType<Nothing>()(min(pf(), Nothing)))

  is(Nothing, isType<Nothing>()(min(mf(), Nothing)))
  is(Nothing, isType<Nothing>()(min(mnf(), Nothing)))
  is(Nothing, isType<Nothing>()(min(mnpf(), Nothing)))
  is(Nothing, isType<Nothing>()(min(mnnf(), Nothing)))
  is(Nothing, isType<Nothing>()(min(mpf(), Nothing)))

  is(Nothing, isType<Nothing>()(min(Nothing, Nothing)))
})
