import {
  Nothing,
  NegativeFloat,
  NonPositiveFloat,
  NonNegativeFloat,
  PositiveFloat,
  Float,
} from '../types/Float.js'
import { isNothing } from './isNothing.js'

export function min(valueA: PositiveFloat, valueB: PositiveFloat): PositiveFloat
export function min(valueA: NegativeFloat, valueB: Float): NegativeFloat
export function min(valueA: Float, valueB: NegativeFloat): NegativeFloat
export function min(valueA: NonPositiveFloat, valueB: Float): NonPositiveFloat
export function min(valueA: Float, valueB: NonPositiveFloat): NonPositiveFloat
export function min(
  valueA: NonNegativeFloat,
  valueB: NonNegativeFloat,
): NonNegativeFloat
export function min(valueA: Float, valueB: Float): Float
export function min(valueA: Nothing, valueB: Nothing): Nothing
export function min(valueA: Nothing, valueB: Float): Nothing
export function min(valueA: Float, valueB: Nothing): Nothing
export function min(valueA: Nothing, valueB: Float | Nothing): Nothing
export function min(valueA: Float | Nothing, valueB: Nothing): Nothing
export function min(
  valueA: PositiveFloat | Nothing,
  valueB: PositiveFloat | Nothing,
): PositiveFloat | Nothing
export function min(
  valueA: NegativeFloat | Nothing,
  valueB: Float | Nothing,
): NegativeFloat | Nothing
export function min(
  valueA: Float | Nothing,
  valueB: NegativeFloat | Nothing,
): NegativeFloat | Nothing
export function min(
  valueA: NonPositiveFloat | Nothing,
  valueB: Float | Nothing,
): NonPositiveFloat | Nothing
export function min(
  valueA: Float | Nothing,
  valueB: NonPositiveFloat | Nothing,
): NonPositiveFloat | Nothing
export function min(
  valueA: NonNegativeFloat | Nothing,
  valueB: NonNegativeFloat | Nothing,
): NonNegativeFloat | Nothing
export function min(
  valueA: Float | Nothing,
  valueB: Float | Nothing,
): Float | Nothing
export function min(
  valueA: Float | Nothing,
  valueB: Float | Nothing,
): Float | Nothing {
  if (isNothing(valueA) || isNothing(valueB)) return Nothing

  // type-coverage:ignore-next-line
  return Math.min(valueA, valueB) as Float
}
