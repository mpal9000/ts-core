import {
  Nothing,
  NegativeFloat,
  NonPositiveFloat,
  PositiveFloat,
} from '../types/Float.js'
import { isFloat } from './isFloat.js'
import { isNonPositive } from './isNonPositive.js'

export function fromNumberNonPositive(value: PositiveFloat): Nothing
export function fromNumberNonPositive(value: NegativeFloat): NegativeFloat
export function fromNumberNonPositive(value: NonPositiveFloat): NonPositiveFloat
export function fromNumberNonPositive(value: number): NonPositiveFloat | Nothing
export function fromNumberNonPositive(
  value: number,
): NonPositiveFloat | Nothing {
  return isFloat(value) && isNonPositive(value) ? value : Nothing
}
