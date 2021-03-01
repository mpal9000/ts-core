import test from 'ava'
import {
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
import { isPositive } from './isPositive.js'

test('isPositive()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  isType<boolean>()(isPositive(f(1)))

  // @ts-expect-error
  apply((v) => (isPositive(v) ? isType<never>()(v) : v), f())
  apply((v) => (isPositive(v) ? isType<PF>()(v) : v), f())
  apply((v) => (isPositive(v) ? isType<never>()(v) : v), nf())
  apply((v) => (isPositive(v) ? isType<never>()(v) : v), npf())
  // @ts-expect-error
  apply((v) => (isPositive(v) ? isType<never>()(v) : v), nnf())
  apply((v) => (isPositive(v) ? isType<PF>()(v) : v), nnf())
  // @ts-expect-error
  apply((v) => (isPositive(v) ? isType<never>()(v) : v), pf())
  apply((v) => (isPositive(v) ? isType<PF>()(v) : v), pf())

  isFalse(isPositive(f(-1)))
  isFalse(isPositive(f(-0)))
  isFalse(isPositive(f(0)))
  isTrue(isPositive(f(1)))
})
