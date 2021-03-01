import { NegativeFloat, NonNegativeFloat, Float } from '../types/Float.js'

export function isNegative(value: NonNegativeFloat): value is never
export function isNegative(value: Float): value is NegativeFloat
export function isNegative(value: Float): value is NegativeFloat {
  return value < 0
}
