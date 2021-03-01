import test from 'ava'
import {
  F,
  NF,
  NPF,
  NNF,
  PF,
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
import * as Maybe from '../types/Maybe.js'
import { toMaybe } from './toMaybe.js'

test('toMaybe()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  isType<Maybe.Nothing>()(toMaybe(Nothing))

  isType<F>()(
    toMaybe(
      // type-coverage:ignore-next-line
      f(1.1) as F & 1.1,
    ),
  )

  isType<F>()(toMaybe(f()))
  isType<NF>()(toMaybe(nf()))
  isType<NPF>()(toMaybe(npf()))
  isType<NNF>()(toMaybe(nnf()))
  isType<PF>()(toMaybe(pf()))

  isType<Maybe.Maybe<F>>()(toMaybe(mf()))
  isType<Maybe.Maybe<NF>>()(toMaybe(mnf()))
  isType<Maybe.Maybe<NPF>>()(toMaybe(mnpf()))
  isType<Maybe.Maybe<NNF>>()(toMaybe(mnnf()))
  isType<Maybe.Maybe<PF>>()(toMaybe(mpf()))

  is(f(1), toMaybe(f(1)))
  is(undefined, toMaybe(Nothing))
})
