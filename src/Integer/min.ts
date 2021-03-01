import {
  Nothing,
  NegativeInteger,
  NonPositiveInteger,
  NonNegativeInteger,
  PositiveInteger,
  Integer,
} from '../types/Integer.js'
import { isNothing } from './isNothing.js'

export function min(
  valueA: PositiveInteger,
  valueB: PositiveInteger,
): PositiveInteger
export function min(valueA: NegativeInteger, valueB: Integer): NegativeInteger
export function min(valueA: Integer, valueB: NegativeInteger): NegativeInteger
export function min(
  valueA: NonPositiveInteger,
  valueB: Integer,
): NonPositiveInteger
export function min(
  valueA: Integer,
  valueB: NonPositiveInteger,
): NonPositiveInteger
export function min(
  valueA: NonNegativeInteger,
  valueB: NonNegativeInteger,
): NonNegativeInteger
export function min(valueA: Integer, valueB: Integer): Integer
export function min(valueA: Nothing, valueB: Nothing): Nothing
export function min(valueA: Nothing, valueB: Integer): Nothing
export function min(valueA: Integer, valueB: Nothing): Nothing
export function min(valueA: Nothing, valueB: Integer | Nothing): Nothing
export function min(valueA: Integer | Nothing, valueB: Nothing): Nothing
export function min(
  valueA: PositiveInteger | Nothing,
  valueB: PositiveInteger | Nothing,
): PositiveInteger | Nothing
export function min(
  valueA: NegativeInteger | Nothing,
  valueB: Integer | Nothing,
): NegativeInteger | Nothing
export function min(
  valueA: Integer | Nothing,
  valueB: NegativeInteger | Nothing,
): NegativeInteger | Nothing
export function min(
  valueA: NonPositiveInteger | Nothing,
  valueB: Integer | Nothing,
): NonPositiveInteger | Nothing
export function min(
  valueA: Integer | Nothing,
  valueB: NonPositiveInteger | Nothing,
): NonPositiveInteger | Nothing
export function min(
  valueA: NonNegativeInteger | Nothing,
  valueB: NonNegativeInteger | Nothing,
): NonNegativeInteger | Nothing
export function min(
  valueA: Integer | Nothing,
  valueB: Integer | Nothing,
): Integer | Nothing
export function min(
  valueA: Integer | Nothing,
  valueB: Integer | Nothing,
): Integer | Nothing {
  if (isNothing(valueA) || isNothing(valueB)) return Nothing

  // type-coverage:ignore-next-line
  return Math.min(valueA, valueB) as Integer
}
