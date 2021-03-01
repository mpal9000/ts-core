import test from 'ava'
import {
  F,
  NF,
  NPF,
  NNF,
  PF,
  wrapTrue,
  wrapFalse,
  isType,
  nan,
  inf,
  n,
  u,
  f,
  nf,
  npf,
  nnf,
  pf,
  apply,
} from '../test.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { isFloat } from './isFloat.js'

test('isFloat()', (t) => {
  const isTrue: ReturnType<typeof wrapTrue> = wrapTrue(t)
  const isFalse: ReturnType<typeof wrapFalse> = wrapFalse(t)

  isType<boolean>()(isFloat(1))

  apply((v) => (isFloat(v) ? isType<never>()(v) : v), 'x')
  // @ts-expect-error
  apply((v) => (isFloat(v) ? isType<never>()(v) : v), 1)
  apply((v) => (isFloat(v) ? isType<F & 1>()(v) : v), 1)
  // @ts-expect-error
  apply((v) => (isFloat(v) ? isType<never>()(v) : v), u())
  apply((v) => (isFloat(v) ? isType<F>()(v) : v), u())
  // @ts-expect-error
  apply((v) => (isFloat(v) ? isType<never>()(v) : v), n())
  apply((v) => (isFloat(v) ? isType<F>()(v) : v), n())
  // @ts-expect-error
  apply((v) => (isFloat(v) ? isType<never>()(v) : v), f())
  apply((v) => (isFloat(v) ? isType<F>()(v) : v), f())
  // @ts-expect-error
  apply((v) => (isFloat(v) ? isType<never>()(v) : v), nf())
  apply((v) => (isFloat(v) ? isType<NF>()(v) : v), nf())
  // @ts-expect-error
  apply((v) => (isFloat(v) ? isType<never>()(v) : v), npf())
  apply((v) => (isFloat(v) ? isType<NPF>()(v) : v), npf())
  // @ts-expect-error
  apply((v) => (isFloat(v) ? isType<never>()(v) : v), nnf())
  apply((v) => (isFloat(v) ? isType<NNF>()(v) : v), nnf())
  // @ts-expect-error
  apply((v) => (isFloat(v) ? isType<never>()(v) : v), pf())
  apply((v) => (isFloat(v) ? isType<PF>()(v) : v), pf())

  isTrue(isFloat(MINIMUM - 10 ** 291))
  isTrue(isFloat(MINIMUM + 10 ** 292))
  isTrue(isFloat(MINIMUM + 10 ** 308))
  isTrue(isFloat(MAXIMUM - 10 ** 308))
  isTrue(isFloat(MAXIMUM - 10 ** 292))
  isTrue(isFloat(MAXIMUM + 10 ** 291))

  isTrue(isFloat(MINIMUM - 1))
  isTrue(isFloat(MINIMUM))
  isTrue(isFloat(-1.4999999999999998))
  isTrue(isFloat(-1.1))
  isTrue(isFloat(-1.0))
  isTrue(isFloat(-1))
  isTrue(isFloat(-0.5000000000000001))
  isTrue(isFloat(-0.49999999999999994))
  isTrue(isFloat(-EPSILON))
  isTrue(isFloat(-SMALLEST))
  isTrue(isFloat(-0.0))
  isTrue(isFloat(-0))
  isTrue(isFloat(0))
  isTrue(isFloat(0.0))
  isTrue(isFloat(SMALLEST))
  isTrue(isFloat(EPSILON))
  isTrue(isFloat(0.49999999999999994))
  isTrue(isFloat(0.5000000000000001))
  isTrue(isFloat(1))
  isTrue(isFloat(1.0))
  isTrue(isFloat(1.1))
  isTrue(isFloat(1.4999999999999998))
  isTrue(isFloat(MAXIMUM))
  isTrue(isFloat(MAXIMUM + 1))

  isFalse(isFloat(nan()))
  isFalse(isFloat(inf()))
  isFalse(isFloat('xxx'))
})
