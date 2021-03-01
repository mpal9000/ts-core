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

export function multiply(rhs: Nothing, lhs: Nothing): Nothing
export function multiply(rhs: Nothing, lhs: Float): Nothing
export function multiply(rhs: Float, lhs: Nothing): Nothing
export function multiply(rhs: Nothing, lhs: Float | Nothing): Nothing
export function multiply(rhs: Float | Nothing, lhs: Nothing): Nothing
export function multiply(
  rhs: NegativeFloat | Nothing,
  lhs: NegativeFloat | Nothing,
): PositiveFloat | Nothing
export function multiply(
  rhs: PositiveFloat | Nothing,
  lhs: PositiveFloat | Nothing,
): PositiveFloat | Nothing
export function multiply(
  rhs: NegativeFloat | Nothing,
  lhs: PositiveFloat | Nothing,
): NegativeFloat | Nothing
export function multiply(
  rhs: PositiveFloat | Nothing,
  lhs: NegativeFloat | Nothing,
): NegativeFloat | Nothing
export function multiply(
  rhs: NonPositiveFloat | Nothing,
  lhs: NonPositiveFloat | Nothing,
): NonNegativeFloat | Nothing
export function multiply(
  rhs: NonNegativeFloat | Nothing,
  lhs: NonNegativeFloat | Nothing,
): NonNegativeFloat | Nothing
export function multiply(
  rhs: NonPositiveFloat | Nothing,
  lhs: NonNegativeFloat | Nothing,
): NonPositiveFloat | Nothing
export function multiply(
  rhs: NonNegativeFloat | Nothing,
  lhs: NonPositiveFloat | Nothing,
): NonPositiveFloat | Nothing
export function multiply(
  rhs: Float | Nothing,
  lhs: Float | Nothing,
): Float | Nothing
export function multiply(
  rhs: Float | Nothing,
  lhs: Float | Nothing,
): Float | Nothing {
  if (isNothing(rhs) || isNothing(lhs)) return Nothing

  const result = lhs * rhs

  return isFinite(result) ? result : Nothing
}
