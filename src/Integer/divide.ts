import {
  Nothing,
  NegativeInteger,
  NonPositiveInteger,
  NonNegativeInteger,
  PositiveInteger,
  Integer,
} from '../types/Integer.js'
import { isNothing } from './isNothing.js'
import { isSafe } from './isSafe.js'

export function divide(
  rhs: NegativeInteger,
  lhs: NegativeInteger,
): PositiveInteger
export function divide(
  rhs: PositiveInteger,
  lhs: PositiveInteger,
): PositiveInteger
export function divide(
  rhs: NegativeInteger,
  lhs: PositiveInteger,
): NegativeInteger
export function divide(
  rhs: PositiveInteger,
  lhs: NegativeInteger,
): NegativeInteger
export function divide(
  rhs: NegativeInteger,
  lhs: NonPositiveInteger,
): NonNegativeInteger
export function divide(
  rhs: NegativeInteger,
  lhs: NonNegativeInteger,
): NonPositiveInteger
export function divide(
  rhs: PositiveInteger,
  lhs: NonPositiveInteger,
): NonPositiveInteger
export function divide(
  rhs: PositiveInteger,
  lhs: NonNegativeInteger,
): NonNegativeInteger
export function divide(
  rhs: NegativeInteger | PositiveInteger,
  lhs: Integer,
): Integer
export function divide(rhs: Nothing, lhs: Nothing): Nothing
export function divide(rhs: Nothing, lhs: Integer): Nothing
export function divide(
  rhs: NegativeInteger | PositiveInteger,
  lhs: Nothing,
): Nothing
export function divide(rhs: Nothing, lhs: Integer | Nothing): Nothing
export function divide(
  rhs: NegativeInteger | PositiveInteger | Nothing,
  lhs: Nothing,
): Nothing
export function divide(
  rhs: NegativeInteger | Nothing,
  lhs: NegativeInteger | Nothing,
): PositiveInteger | Nothing
export function divide(
  rhs: PositiveInteger | Nothing,
  lhs: PositiveInteger | Nothing,
): PositiveInteger | Nothing
export function divide(
  rhs: NegativeInteger | Nothing,
  lhs: PositiveInteger | Nothing,
): NegativeInteger | Nothing
export function divide(
  rhs: PositiveInteger | Nothing,
  lhs: NegativeInteger | Nothing,
): NegativeInteger | Nothing
export function divide(
  rhs: NegativeInteger | Nothing,
  lhs: NonPositiveInteger | Nothing,
): NonNegativeInteger | Nothing
export function divide(
  rhs: NegativeInteger | Nothing,
  lhs: NonNegativeInteger | Nothing,
): NonPositiveInteger | Nothing
export function divide(
  rhs: PositiveInteger | Nothing,
  lhs: NonPositiveInteger | Nothing,
): NonPositiveInteger | Nothing
export function divide(
  rhs: PositiveInteger | Nothing,
  lhs: NonNegativeInteger | Nothing,
): NonNegativeInteger | Nothing
export function divide(
  rhs: NegativeInteger | PositiveInteger | Nothing,
  lhs: Integer | Nothing,
): Integer | Nothing
export function divide(
  rhs: NegativeInteger | PositiveInteger | Nothing,
  lhs: Integer | Nothing,
): Integer | Nothing {
  if (isNothing(rhs) || isNothing(lhs)) return Nothing

  const result = Math.trunc(lhs / rhs)

  return isSafe(result) ? result : Nothing
}
