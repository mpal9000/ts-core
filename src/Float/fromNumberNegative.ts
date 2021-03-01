import { Nothing, NegativeFloat, NonNegativeFloat } from '../types/Float.js'
import { isFloat } from './isFloat.js'
import { isNegative } from './isNegative.js'

export function fromNumberNegative(value: NonNegativeFloat): Nothing
export function fromNumberNegative(value: NegativeFloat): NegativeFloat
export function fromNumberNegative(value: number): NegativeFloat | Nothing
export function fromNumberNegative(value: number): NegativeFloat | Nothing {
  return isFloat(value) && isNegative(value) ? value : Nothing
}
