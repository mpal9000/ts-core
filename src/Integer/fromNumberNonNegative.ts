import {
  Nothing,
  NegativeInteger,
  NonNegativeInteger,
  PositiveInteger,
} from '../types/Integer.js'
import { isInteger } from './isInteger.js'
import { isNonNegative } from './isNonNegative.js'

export function fromNumberNonNegative(value: NegativeInteger): Nothing
export function fromNumberNonNegative(value: PositiveInteger): PositiveInteger
export function fromNumberNonNegative(
  value: NonNegativeInteger,
): NonNegativeInteger
export function fromNumberNonNegative(
  value: number,
): NonNegativeInteger | Nothing
export function fromNumberNonNegative(
  value: number,
): NonNegativeInteger | Nothing {
  return isInteger(value) && isNonNegative(value) ? value : Nothing
}
