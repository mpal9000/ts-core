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

export function subtract(rhs: Nothing, lhs: Nothing): Nothing
export function subtract(rhs: Nothing, lhs: Float): Nothing
export function subtract(rhs: Float, lhs: Nothing): Nothing
export function subtract(rhs: Nothing, lhs: Float | Nothing): Nothing
export function subtract(rhs: Float | Nothing, lhs: Nothing): Nothing
export function subtract(
  rhs: NegativeFloat | Nothing,
  lhs: NonNegativeFloat | Nothing,
): PositiveFloat | Nothing
export function subtract(
  rhs: NonNegativeFloat | Nothing,
  lhs: NegativeFloat | Nothing,
): NegativeFloat | Nothing
export function subtract(
  rhs: PositiveFloat | Nothing,
  lhs: NonPositiveFloat | Nothing,
): NegativeFloat | Nothing
export function subtract(
  rhs: NonPositiveFloat | Nothing,
  lhs: PositiveFloat | Nothing,
): PositiveFloat | Nothing
export function subtract(
  rhs: NonPositiveFloat | Nothing,
  lhs: NonNegativeFloat | Nothing,
): NonNegativeFloat | Nothing
export function subtract(
  rhs: NonNegativeFloat | Nothing,
  lhs: NonPositiveFloat | Nothing,
): NonPositiveFloat | Nothing
export function subtract(
  rhs: Float | Nothing,
  lhs: Float | Nothing,
): Float | Nothing
export function subtract(
  rhs: Float | Nothing,
  lhs: Float | Nothing,
): Float | Nothing {
  if (isNothing(rhs) || isNothing(lhs)) return Nothing

  const result = lhs - rhs

  return isFinite(result) ? result : Nothing
}
