import test from 'ava'
import { MNNF, wrapIs, isType, nan, inf, f } from '../test.js'
import { Nothing } from '../types/Float.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { fromStringNonNegative } from './fromStringNonNegative.js'

test('fromStringNonNegative()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  isType<MNNF>()(fromStringNonNegative('1'))

  is(Nothing, fromStringNonNegative(`${MINIMUM - 10 ** 291}`))
  is(Nothing, fromStringNonNegative(`${MINIMUM + 10 ** 292}`))
  is(Nothing, fromStringNonNegative(`${MINIMUM + 10 ** 308}`))
  is(f(7.976931348623157e307), fromStringNonNegative(`${MAXIMUM - 10 ** 308}`))
  is(f(1.7976931348623155e308), fromStringNonNegative(`${MAXIMUM - 10 ** 292}`))
  is(f(1.7976931348623157e308), fromStringNonNegative(`${MAXIMUM + 10 ** 291}`))

  is(Nothing, fromStringNonNegative(`${MINIMUM - 1}`))
  is(Nothing, fromStringNonNegative(`${MINIMUM}`))
  is(Nothing, fromStringNonNegative('-1.4999999999999998'))
  is(Nothing, fromStringNonNegative('-1.23'))
  is(Nothing, fromStringNonNegative('-1.00'))
  is(Nothing, fromStringNonNegative('-1.0'))
  is(Nothing, fromStringNonNegative('-1'))
  is(Nothing, fromStringNonNegative('-0.5000000000000001'))
  is(Nothing, fromStringNonNegative('-0.49999999999999994'))
  is(Nothing, fromStringNonNegative(`${-EPSILON}`))
  is(Nothing, fromStringNonNegative(`${-SMALLEST}`))
  is(f(-0), fromStringNonNegative('-0.0'))
  is(f(-0), fromStringNonNegative('-0'))
  is(f(0), fromStringNonNegative('0'))
  is(f(0), fromStringNonNegative('0.0'))
  is(f(5e-324), fromStringNonNegative(`${SMALLEST}`))
  is(f(2.220446049250313e-16), fromStringNonNegative(`${EPSILON}`))
  is(f(0.49999999999999994), fromStringNonNegative('0.49999999999999994'))
  is(f(0.5000000000000001), fromStringNonNegative('0.5000000000000001'))
  is(f(1), fromStringNonNegative('1'))
  is(f(1), fromStringNonNegative('1.0'))
  is(f(1), fromStringNonNegative('1.00'))
  is(f(1.23), fromStringNonNegative('1.23'))
  is(f(1.4999999999999998), fromStringNonNegative('1.4999999999999998'))
  is(f(1.7976931348623157e308), fromStringNonNegative(`${MAXIMUM}`))
  is(f(1.7976931348623157e308), fromStringNonNegative(`${MAXIMUM + 1}`))

  is(Nothing, fromStringNonNegative(`${nan()}`))
  is(Nothing, fromStringNonNegative(`${inf()}`))
  is(Nothing, fromStringNonNegative('xxx'))
})
