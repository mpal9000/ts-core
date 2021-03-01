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

export function add(rhs: Nothing, lhs: Nothing): Nothing
export function add(rhs: Nothing, lhs: Float): Nothing
export function add(rhs: Float, lhs: Nothing): Nothing
export function add(rhs: Nothing, lhs: Float | Nothing): Nothing
export function add(rhs: Float | Nothing, lhs: Nothing): Nothing
export function add(
  rhs: NegativeFloat | Nothing,
  lhs: NonPositiveFloat | Nothing,
): NegativeFloat | Nothing
export function add(
  rhs: NonPositiveFloat | Nothing,
  lhs: NegativeFloat | Nothing,
): NegativeFloat | Nothing
export function add(
  rhs: PositiveFloat | Nothing,
  lhs: NonNegativeFloat | Nothing,
): PositiveFloat | Nothing
export function add(
  rhs: NonNegativeFloat | Nothing,
  lhs: PositiveFloat | Nothing,
): PositiveFloat | Nothing
export function add(
  rhs: NonPositiveFloat | Nothing,
  lhs: NonPositiveFloat | Nothing,
): NonPositiveFloat | Nothing
export function add(
  rhs: NonNegativeFloat | Nothing,
  lhs: NonNegativeFloat | Nothing,
): NonNegativeFloat | Nothing
export function add(rhs: Float | Nothing, lhs: Float | Nothing): Float | Nothing
export function add(
  rhs: Float | Nothing,
  lhs: Float | Nothing,
): Float | Nothing {
  if (isNothing(rhs) || isNothing(lhs)) return Nothing

  const result = lhs + rhs

  return isFinite(result) ? result : Nothing
}
