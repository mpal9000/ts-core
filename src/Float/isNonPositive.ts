import { NonPositiveFloat, PositiveFloat, Float } from '../types/Float.js'

export function isNonPositive(value: PositiveFloat): value is never
export function isNonPositive(value: Float): value is NonPositiveFloat
export function isNonPositive(value: Float): value is NonPositiveFloat {
  return value <= 0
}
