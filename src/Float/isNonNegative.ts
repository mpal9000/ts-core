import { NegativeFloat, NonNegativeFloat, Float } from '../types/Float.js'

export function isNonNegative(value: NegativeFloat): value is never
export function isNonNegative(value: Float): value is NonNegativeFloat
export function isNonNegative(value: Float): value is NonNegativeFloat {
  return value >= 0
}
