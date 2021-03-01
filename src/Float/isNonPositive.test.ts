import test from 'ava'
import {
  ZF,
  NF,
  NPF,
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
import { isNonPositive } from './isNonPositive.js'

test('isNonPositive()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  isType<boolean>()(isNonPositive(f(1)))

  // @ts-expect-error
  apply((v) => (isNonPositive(v) ? isType<never>()(v) : v), f())
  apply((v) => (isNonPositive(v) ? isType<NPF>()(v) : v), f())
  // @ts-expect-error
  apply((v) => (isNonPositive(v) ? isType<never>()(v) : v), nf())
  apply((v) => (isNonPositive(v) ? isType<NF>()(v) : v), nf())
  // @ts-expect-error
  apply((v) => (isNonPositive(v) ? isType<never>()(v) : v), npf())
  apply((v) => (isNonPositive(v) ? isType<NPF>()(v) : v), npf())
  // @ts-expect-error
  apply((v) => (isNonPositive(v) ? isType<never>()(v) : v), nnf())
  apply((v) => (isNonPositive(v) ? isType<ZF>()(v) : v), nnf())
  apply((v) => (isNonPositive(v) ? isType<never>()(v) : v), pf())

  isTrue(isNonPositive(f(-1)))
  isTrue(isNonPositive(f(-0)))
  isTrue(isNonPositive(f(0)))
  isFalse(isNonPositive(f(1)))
})
