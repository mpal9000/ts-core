import {
  Nothing,
  NegativeInteger,
  NonPositiveInteger,
  NonNegativeInteger,
  PositiveInteger,
  Integer,
} from '../types/Integer.js'
import { isNothing } from './isNothing.js'

export function max(
  valueA: NegativeInteger,
  valueB: NegativeInteger,
): NegativeInteger
export function max(valueA: PositiveInteger, valueB: Integer): PositiveInteger
export function max(valueA: Integer, valueB: PositiveInteger): PositiveInteger
export function max(
  valueA: NonPositiveInteger,
  valueB: NonPositiveInteger,
): NonPositiveInteger
export function max(
  valueA: NonNegativeInteger,
  valueB: Integer,
): NonNegativeInteger
export function max(
  valueA: Integer,
  valueB: NonNegativeInteger,
): NonNegativeInteger
export function max(valueA: Integer, valueB: Integer): Integer
export function max(valueA: Nothing, valueB: Nothing): Nothing
export function max(valueA: Nothing, valueB: Integer): Nothing
export function max(valueA: Integer, valueB: Nothing): Nothing
export function max(valueA: Nothing, valueB: Integer | Nothing): Nothing
export function max(valueA: Integer | Nothing, valueB: Nothing): Nothing
export function max(
  valueA: NegativeInteger | Nothing,
  valueB: NegativeInteger | Nothing,
): NegativeInteger | Nothing
export function max(
  valueA: PositiveInteger | Nothing,
  valueB: Integer | Nothing,
): PositiveInteger | Nothing
export function max(
  valueA: Integer | Nothing,
  valueB: PositiveInteger | Nothing,
): PositiveInteger | Nothing
export function max(
  valueA: NonPositiveInteger | Nothing,
  valueB: NonPositiveInteger | Nothing,
): NonPositiveInteger | Nothing
export function max(
  valueA: NonNegativeInteger | Nothing,
  valueB: Integer | Nothing,
): NonNegativeInteger | Nothing
export function max(
  valueA: Integer | Nothing,
  valueB: NonNegativeInteger | Nothing,
): NonNegativeInteger | Nothing
export function max(
  valueA: Integer | Nothing,
  valueB: Integer | Nothing,
): Integer | Nothing
export function max(
  valueA: Integer | Nothing,
  valueB: Integer | Nothing,
): Integer | Nothing {
  if (isNothing(valueA) || isNothing(valueB)) return Nothing

  // type-coverage:ignore-next-line
  return Math.max(valueA, valueB) as Integer
}
