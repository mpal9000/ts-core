import test from 'ava'
import { MF, wrapIs, isType, nan, inf, f } from '../test.js'
import { Nothing } from '../types/Float.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { fromString } from './fromString.js'

test('fromString()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  isType<MF>()(fromString('1'))

  is(f(-1.7976931348623157e308), fromString(`${MINIMUM - 10 ** 291}`))
  is(f(-1.7976931348623155e308), fromString(`${MINIMUM + 10 ** 292}`))
  is(f(-7.976931348623157e307), fromString(`${MINIMUM + 10 ** 308}`))
  is(f(7.976931348623157e307), fromString(`${MAXIMUM - 10 ** 308}`))
  is(f(1.7976931348623155e308), fromString(`${MAXIMUM - 10 ** 292}`))
  is(f(1.7976931348623157e308), fromString(`${MAXIMUM + 10 ** 291}`))

  is(f(-1.7976931348623157e308), fromString(`${MINIMUM - 1}`))
  is(f(-1.7976931348623157e308), fromString(`${MINIMUM}`))
  is(f(-1.4999999999999998), fromString('-1.4999999999999998'))
  is(f(-1.23), fromString('-1.23'))
  is(f(-1), fromString('-1.00'))
  is(f(-1), fromString('-1.0'))
  is(f(-1), fromString('-1'))
  is(f(-0.5000000000000001), fromString('-0.5000000000000001'))
  is(f(-0.49999999999999994), fromString('-0.49999999999999994'))
  is(f(-2.220446049250313e-16), fromString(`${-EPSILON}`))
  is(f(-5e-324), fromString(`${-SMALLEST}`))
  is(f(-0), fromString('-0.0'))
  is(f(-0), fromString('-0'))
  is(f(0), fromString('0'))
  is(f(0), fromString('0.0'))
  is(f(5e-324), fromString(`${SMALLEST}`))
  is(f(2.220446049250313e-16), fromString(`${EPSILON}`))
  is(f(0.49999999999999994), fromString('0.49999999999999994'))
  is(f(0.5000000000000001), fromString('0.5000000000000001'))
  is(f(1), fromString('1'))
  is(f(1), fromString('1.0'))
  is(f(1), fromString('1.00'))
  is(f(1.23), fromString('1.23'))
  is(f(1.4999999999999998), fromString('1.4999999999999998'))
  is(f(1.7976931348623157e308), fromString(`${MAXIMUM}`))
  is(f(1.7976931348623157e308), fromString(`${MAXIMUM + 1}`))

  is(Nothing, fromString(`${nan()}`))
  is(Nothing, fromString(`${inf()}`))
  is(Nothing, fromString('xxx'))
})
