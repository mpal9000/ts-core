import { Nothing, NonPositiveFloat, PositiveFloat } from '../types/Float.js'
import { isFloat } from './isFloat.js'
import { isPositive } from './isPositive.js'

export function fromNumberPositive(value: NonPositiveFloat): Nothing
export function fromNumberPositive(value: PositiveFloat): PositiveFloat
export function fromNumberPositive(value: number): PositiveFloat | Nothing
export function fromNumberPositive(value: number): PositiveFloat | Nothing {
  return isFloat(value) && isPositive(value) ? value : Nothing
}
