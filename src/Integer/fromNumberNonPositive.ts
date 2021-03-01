import {
  Nothing,
  NegativeInteger,
  NonPositiveInteger,
  PositiveInteger,
} from '../types/Integer.js'
import { isInteger } from './isInteger.js'
import { isNonPositive } from './isNonPositive.js'

export function fromNumberNonPositive(value: PositiveInteger): Nothing
export function fromNumberNonPositive(value: NegativeInteger): NegativeInteger
export function fromNumberNonPositive(
  value: NonPositiveInteger,
): NonPositiveInteger
export function fromNumberNonPositive(
  value: number,
): NonPositiveInteger | Nothing
export function fromNumberNonPositive(
  value: number,
): NonPositiveInteger | Nothing {
  return isInteger(value) && isNonPositive(value) ? value : Nothing
}
