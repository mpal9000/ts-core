import test from 'ava'
import { MPF, wrapIs, isType, nan, inf, f } from '../test.js'
import { Nothing } from '../types/Float.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { fromStringPositive } from './fromStringPositive.js'

test('fromStringPositive()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  isType<MPF>()(fromStringPositive('1'))

  is(Nothing, fromStringPositive(`${MINIMUM - 10 ** 291}`))
  is(Nothing, fromStringPositive(`${MINIMUM + 10 ** 292}`))
  is(Nothing, fromStringPositive(`${MINIMUM + 10 ** 308}`))
  is(f(7.976931348623157e307), fromStringPositive(`${MAXIMUM - 10 ** 308}`))
  is(f(1.7976931348623155e308), fromStringPositive(`${MAXIMUM - 10 ** 292}`))
  is(f(1.7976931348623157e308), fromStringPositive(`${MAXIMUM + 10 ** 291}`))

  is(Nothing, fromStringPositive(`${MINIMUM - 1}`))
  is(Nothing, fromStringPositive(`${MINIMUM}`))
  is(Nothing, fromStringPositive('-1.4999999999999998'))
  is(Nothing, fromStringPositive('-1.23'))
  is(Nothing, fromStringPositive('-1.00'))
  is(Nothing, fromStringPositive('-1.0'))
  is(Nothing, fromStringPositive('-1'))
  is(Nothing, fromStringPositive('-0.5000000000000001'))
  is(Nothing, fromStringPositive('-0.49999999999999994'))
  is(Nothing, fromStringPositive(`${-EPSILON}`))
  is(Nothing, fromStringPositive(`${-SMALLEST}`))
  is(Nothing, fromStringPositive('-0.0'))
  is(Nothing, fromStringPositive('-0'))
  is(Nothing, fromStringPositive('0'))
  is(Nothing, fromStringPositive('0.0'))
  is(f(5e-324), fromStringPositive(`${SMALLEST}`))
  is(f(2.220446049250313e-16), fromStringPositive(`${EPSILON}`))
  is(f(0.49999999999999994), fromStringPositive('0.49999999999999994'))
  is(f(0.5000000000000001), fromStringPositive('0.5000000000000001'))
  is(f(1), fromStringPositive('1'))
  is(f(1), fromStringPositive('1.0'))
  is(f(1), fromStringPositive('1.00'))
  is(f(1.23), fromStringPositive('1.23'))
  is(f(1.4999999999999998), fromStringPositive('1.4999999999999998'))
  is(f(1.7976931348623157e308), fromStringPositive(`${MAXIMUM}`))
  is(f(1.7976931348623157e308), fromStringPositive(`${MAXIMUM + 1}`))

  is(Nothing, fromStringPositive(`${nan()}`))
  is(Nothing, fromStringPositive(`${inf()}`))
  is(Nothing, fromStringPositive('xxx'))
})
