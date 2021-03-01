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

export function decrement(value: Nothing): Nothing
export function decrement(value: PositiveFloat): NonNegativeFloat
export function decrement(value: NonPositiveFloat): NegativeFloat
export function decrement(value: Float): Float
export function decrement(
  value: PositiveFloat | Nothing,
): NonNegativeFloat | Nothing
export function decrement(
  value: NonPositiveFloat | Nothing,
): NegativeFloat | Nothing
export function decrement(value: Float | Nothing): Float | Nothing
export function decrement(value: Float | Nothing): Float | Nothing {
  if (isNothing(value)) return Nothing

  const result = value - 1

  return isFinite(result) ? result : Nothing
}
