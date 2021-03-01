import test from 'ava'
import {
  ZF,
  NNF,
  PF,
  wrapTrue,
  wrapFalse,
  isType,
  f,
  nf,
  npf,
  nnf,
  pf,
  apply,
} from '../test.js'
import { isNonNegative } from './isNonNegative.js'

test('isNonNegative()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  isType<boolean>()(isNonNegative(f(1)))

  // @ts-expect-error
  apply((v) => (isNonNegative(v) ? isType<never>()(v) : v), f())
  apply((v) => (isNonNegative(v) ? isType<NNF>()(v) : v), f())
  apply((v) => (isNonNegative(v) ? isType<never>()(v) : v), nf())
  // @ts-expect-error
  apply((v) => (isNonNegative(v) ? isType<never>()(v) : v), npf())
  apply((v) => (isNonNegative(v) ? isType<ZF>()(v) : v), npf())
  // @ts-expect-error
  apply((v) => (isNonNegative(v) ? isType<never>()(v) : v), nnf())
  apply((v) => (isNonNegative(v) ? isType<NNF>()(v) : v), nnf())
  // @ts-expect-error
  apply((v) => (isNonNegative(v) ? isType<never>()(v) : v), pf())
  apply((v) => (isNonNegative(v) ? isType<PF>()(v) : v), pf())

  isFalse(isNonNegative(f(-1)))
  isTrue(isNonNegative(f(-0)))
  isTrue(isNonNegative(f(0)))
  isTrue(isNonNegative(f(1)))
})
