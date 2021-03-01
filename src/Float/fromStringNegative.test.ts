import test from 'ava'
import { MNF, wrapIs, isType, nan, inf, f } from '../test.js'
import { Nothing } from '../types/Float.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { fromStringNegative } from './fromStringNegative.js'

test('fromStringNegative()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  isType<MNF>()(fromStringNegative('1'))

  is(f(-1.7976931348623157e308), fromStringNegative(`${MINIMUM - 10 ** 291}`))
  is(f(-1.7976931348623155e308), fromStringNegative(`${MINIMUM + 10 ** 292}`))
  is(f(-7.976931348623157e307), fromStringNegative(`${MINIMUM + 10 ** 308}`))
  is(Nothing, fromStringNegative(`${MAXIMUM - 10 ** 308}`))
  is(Nothing, fromStringNegative(`${MAXIMUM - 10 ** 292}`))
  is(Nothing, fromStringNegative(`${MAXIMUM + 10 ** 291}`))

  is(f(-1.7976931348623157e308), fromStringNegative(`${MINIMUM - 1}`))
  is(f(-1.7976931348623157e308), fromStringNegative(`${MINIMUM}`))
  is(f(-1.4999999999999998), fromStringNegative('-1.4999999999999998'))
  is(f(-1.23), fromStringNegative('-1.23'))
  is(f(-1), fromStringNegative('-1.00'))
  is(f(-1), fromStringNegative('-1.0'))
  is(f(-1), fromStringNegative('-1'))
  is(f(-0.5000000000000001), fromStringNegative('-0.5000000000000001'))
  is(f(-0.49999999999999994), fromStringNegative('-0.49999999999999994'))
  is(f(-2.220446049250313e-16), fromStringNegative(`${-EPSILON}`))
  is(f(-5e-324), fromStringNegative(`${-SMALLEST}`))
  is(Nothing, fromStringNegative('-0.0'))
  is(Nothing, fromStringNegative('-0'))
  is(Nothing, fromStringNegative('0'))
  is(Nothing, fromStringNegative('0.0'))
  is(Nothing, fromStringNegative(`${SMALLEST}`))
  is(Nothing, fromStringNegative(`${EPSILON}`))
  is(Nothing, fromStringNegative('0.49999999999999994'))
  is(Nothing, fromStringNegative('0.5000000000000001'))
  is(Nothing, fromStringNegative('1'))
  is(Nothing, fromStringNegative('1.0'))
  is(Nothing, fromStringNegative('1.00'))
  is(Nothing, fromStringNegative('1.23'))
  is(Nothing, fromStringNegative('1.4999999999999998'))
  is(Nothing, fromStringNegative(`${MAXIMUM}`))
  is(Nothing, fromStringNegative(`${MAXIMUM + 1}`))

  is(Nothing, fromStringNegative(`${nan()}`))
  is(Nothing, fromStringNegative(`${inf()}`))
  is(Nothing, fromStringNegative('xxx'))
})
