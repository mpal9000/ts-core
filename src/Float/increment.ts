import {
  Nothing,
  NegativeFloat,
  NonPositiveFloat,
  NonNegativeFloat,
  PositiveFloat,
  Float,
} from '../types/Float.js'
import { isNothing } from './isNothing.js'
import { isFinite } from './isFinite.js'

export function increment(value: Nothing): Nothing
export function increment(value: NegativeFloat): NonPositiveFloat
export function increment(value: NonNegativeFloat): PositiveFloat
export function increment(value: Float): Float
export function increment(
  value: NegativeFloat | Nothing,
): NonPositiveFloat | Nothing
export function increment(
  value: NonNegativeFloat | Nothing,
): PositiveFloat | Nothing
export function increment(value: Float | Nothing): Float | Nothing
export function increment(value: Float | Nothing): Float | Nothing {
  if (isNothing(value)) return Nothing

  const result = value + 1

  return isFinite(result) ? result : Nothing
}
