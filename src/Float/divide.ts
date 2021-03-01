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

export function divide(rhs: Nothing, lhs: Nothing): Nothing
export function divide(rhs: Nothing, lhs: Float): Nothing
export function divide(
  rhs: NegativeFloat | PositiveFloat,
  lhs: Nothing,
): Nothing
export function divide(rhs: Nothing, lhs: Float | Nothing): Nothing
export function divide(
  rhs: NegativeFloat | PositiveFloat | Nothing,
  lhs: Nothing,
): Nothing
export function divide(
  rhs: NegativeFloat | Nothing,
  lhs: NegativeFloat | Nothing,
): PositiveFloat | Nothing
export function divide(
  rhs: PositiveFloat | Nothing,
  lhs: PositiveFloat | Nothing,
): PositiveFloat | Nothing
export function divide(
  rhs: NegativeFloat | Nothing,
  lhs: PositiveFloat | Nothing,
): NegativeFloat | Nothing
export function divide(
  rhs: PositiveFloat | Nothing,
  lhs: NegativeFloat | Nothing,
): NegativeFloat | Nothing
export function divide(
  rhs: NegativeFloat | Nothing,
  lhs: NonPositiveFloat | Nothing,
): NonNegativeFloat | Nothing
export function divide(
  rhs: NegativeFloat | Nothing,
  lhs: NonNegativeFloat | Nothing,
): NonPositiveFloat | Nothing
export function divide(
  rhs: PositiveFloat | Nothing,
  lhs: NonPositiveFloat | Nothing,
): NonPositiveFloat | Nothing
export function divide(
  rhs: PositiveFloat | Nothing,
  lhs: NonNegativeFloat | Nothing,
): NonNegativeFloat | Nothing
export function divide(
  rhs: NegativeFloat | PositiveFloat | Nothing,
  lhs: Float | Nothing,
): Float | Nothing
export function divide(
  rhs: NegativeFloat | PositiveFloat | Nothing,
  lhs: Float | Nothing,
): Float | Nothing {
  if (isNothing(rhs) || isNothing(lhs)) return Nothing

  const result = lhs / rhs

  return isFinite(result) ? result : Nothing
}
