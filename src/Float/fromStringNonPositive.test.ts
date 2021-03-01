import test from 'ava'
import { MNPF, wrapIs, isType, nan, inf, f } from '../test.js'
import { Nothing } from '../types/Float.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { fromStringNonPositive } from './fromStringNonPositive.js'

test('fromStringNonPositive()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  isType<MNPF>()(fromStringNonPositive('1'))

  is(
    f(-1.7976931348623157e308),
    fromStringNonPositive(`${MINIMUM - 10 ** 291}`),
  )
  is(
    f(-1.7976931348623155e308),
    fromStringNonPositive(`${MINIMUM + 10 ** 292}`),
  )
  is(f(-7.976931348623157e307), fromStringNonPositive(`${MINIMUM + 10 ** 308}`))
  is(Nothing, fromStringNonPositive(`${MAXIMUM - 10 ** 308}`))
  is(Nothing, fromStringNonPositive(`${MAXIMUM - 10 ** 292}`))
  is(Nothing, fromStringNonPositive(`${MAXIMUM + 10 ** 291}`))

  is(f(-1.7976931348623157e308), fromStringNonPositive(`${MINIMUM - 1}`))
  is(f(-1.7976931348623157e308), fromStringNonPositive(`${MINIMUM}`))
  is(f(-1.4999999999999998), fromStringNonPositive('-1.4999999999999998'))
  is(f(-1.23), fromStringNonPositive('-1.23'))
  is(f(-1), fromStringNonPositive('-1.00'))
  is(f(-1), fromStringNonPositive('-1.0'))
  is(f(-1), fromStringNonPositive('-1'))
  is(f(-0.5000000000000001), fromStringNonPositive('-0.5000000000000001'))
  is(f(-0.49999999999999994), fromStringNonPositive('-0.49999999999999994'))
  is(f(-2.220446049250313e-16), fromStringNonPositive(`${-EPSILON}`))
  is(f(-5e-324), fromStringNonPositive(`${-SMALLEST}`))
  is(f(-0), fromStringNonPositive('-0.0'))
  is(f(-0), fromStringNonPositive('-0'))
  is(f(0), fromStringNonPositive('0'))
  is(f(0), fromStringNonPositive('0.0'))
  is(Nothing, fromStringNonPositive(`${SMALLEST}`))
  is(Nothing, fromStringNonPositive(`${EPSILON}`))
  is(Nothing, fromStringNonPositive('0.49999999999999994'))
  is(Nothing, fromStringNonPositive('0.5000000000000001'))
  is(Nothing, fromStringNonPositive('1'))
  is(Nothing, fromStringNonPositive('1.0'))
  is(Nothing, fromStringNonPositive('1.00'))
  is(Nothing, fromStringNonPositive('1.23'))
  is(Nothing, fromStringNonPositive('1.4999999999999998'))
  is(Nothing, fromStringNonPositive(`${MAXIMUM}`))
  is(Nothing, fromStringNonPositive(`${MAXIMUM + 1}`))

  is(Nothing, fromStringNonPositive(`${nan()}`))
  is(Nothing, fromStringNonPositive(`${inf()}`))
  is(Nothing, fromStringNonPositive('xxx'))
})
