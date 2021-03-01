import {
  Nothing,
  NegativeFloat,
  NonPositiveFloat,
  NonNegativeFloat,
  PositiveFloat,
  Float,
} from '../types/Float.js'
import { isNothing } from './isNothing.js'

export function max(valueA: NegativeFloat, valueB: NegativeFloat): NegativeFloat
export function max(valueA: PositiveFloat, valueB: Float): PositiveFloat
export function max(valueA: Float, valueB: PositiveFloat): PositiveFloat
export function max(
  valueA: NonPositiveFloat,
  valueB: NonPositiveFloat,
): NonPositiveFloat
export function max(valueA: NonNegativeFloat, valueB: Float): NonNegativeFloat
export function max(valueA: Float, valueB: NonNegativeFloat): NonNegativeFloat
export function max(valueA: Float, valueB: Float): Float
export function max(valueA: Nothing, valueB: Nothing): Nothing
export function max(valueA: Nothing, valueB: Float): Nothing
export function max(valueA: Float, valueB: Nothing): Nothing
export function max(valueA: Nothing, valueB: Float | Nothing): Nothing
export function max(valueA: Float | Nothing, valueB: Nothing): Nothing
export function max(
  valueA: NegativeFloat | Nothing,
  valueB: NegativeFloat | Nothing,
): NegativeFloat | Nothing
export function max(
  valueA: PositiveFloat | Nothing,
  valueB: Float | Nothing,
): PositiveFloat | Nothing
export function max(
  valueA: Float | Nothing,
  valueB: PositiveFloat | Nothing,
): PositiveFloat | Nothing
export function max(
  valueA: NonPositiveFloat | Nothing,
  valueB: NonPositiveFloat | Nothing,
): NonPositiveFloat | Nothing
export function max(
  valueA: NonNegativeFloat | Nothing,
  valueB: Float | Nothing,
): NonNegativeFloat | Nothing
export function max(
  valueA: Float | Nothing,
  valueB: NonNegativeFloat | Nothing,
): NonNegativeFloat | Nothing
export function max(
  valueA: Float | Nothing,
  valueB: Float | Nothing,
): Float | Nothing
export function max(
  valueA: Float | Nothing,
  valueB: Float | Nothing,
): Float | Nothing {
  if (isNothing(valueA) || isNothing(valueB)) return Nothing

  // type-coverage:ignore-next-line
  return Math.max(valueA, valueB) as Float
}
