import test from 'ava'
import {
  NF,
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
import { isNegative } from './isNegative.js'

test('isNegative()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  isType<boolean>()(isNegative(f(1)))

  // @ts-expect-error
  apply((v) => (isNegative(v) ? isType<never>()(v) : v), f())
  apply((v) => (isNegative(v) ? isType<NF>()(v) : v), f())
  // @ts-expect-error
  apply((v) => (isNegative(v) ? isType<never>()(v) : v), nf())
  apply((v) => (isNegative(v) ? isType<NF>()(v) : v), nf())
  // @ts-expect-error
  apply((v) => (isNegative(v) ? isType<never>()(v) : v), npf())
  apply((v) => (isNegative(v) ? isType<NF>()(v) : v), npf())
  apply((v) => (isNegative(v) ? isType<never>()(v) : v), nnf())
  apply((v) => (isNegative(v) ? isType<never>()(v) : v), pf())

  isTrue(isNegative(f(-1)))
  isFalse(isNegative(f(-0)))
  isFalse(isNegative(f(0)))
  isFalse(isNegative(f(1)))
})
