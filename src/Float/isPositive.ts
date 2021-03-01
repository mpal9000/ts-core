import { NonPositiveFloat, PositiveFloat, Float } from '../types/Float.js'

export function isPositive(value: NonPositiveFloat): value is never
export function isPositive(value: Float): value is PositiveFloat
export function isPositive(value: Float): value is PositiveFloat {
  return value > 0
}
