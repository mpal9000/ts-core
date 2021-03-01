import {
  Nothing,
  NegativeFloat,
  NonNegativeFloat,
  PositiveFloat,
} from '../types/Float.js'
import { isFloat } from './isFloat.js'
import { isNonNegative } from './isNonNegative.js'

export function fromNumberNonNegative(value: NegativeFloat): Nothing
export function fromNumberNonNegative(value: PositiveFloat): PositiveFloat
export function fromNumberNonNegative(value: NonNegativeFloat): NonNegativeFloat
export function fromNumberNonNegative(value: number): NonNegativeFloat | Nothing
export function fromNumberNonNegative(
  value: number,
): NonNegativeFloat | Nothing {
  return isFloat(value) && isNonNegative(value) ? value : Nothing
}
