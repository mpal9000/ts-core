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

export function subtract(rhs: Nothing, lhs: Nothing): Nothing
export function subtract(rhs: Nothing, lhs: Integer): Nothing
export function subtract(rhs: Integer, lhs: Nothing): Nothing
export function subtract(rhs: Nothing, lhs: Integer | Nothing): Nothing
export function subtract(rhs: Integer | Nothing, lhs: Nothing): Nothing
export function subtract(
  rhs: NegativeInteger | Nothing,
  lhs: NonNegativeInteger | Nothing,
): PositiveInteger | Nothing
export function subtract(
  rhs: NonNegativeInteger | Nothing,
  lhs: NegativeInteger | Nothing,
): NegativeInteger | Nothing
export function subtract(
  rhs: PositiveInteger | Nothing,
  lhs: NonPositiveInteger | Nothing,
): NegativeInteger | Nothing
export function subtract(
  rhs: NonPositiveInteger | Nothing,
  lhs: PositiveInteger | Nothing,
): PositiveInteger | Nothing
export function subtract(
  rhs: NonPositiveInteger | Nothing,
  lhs: NonNegativeInteger | Nothing,
): NonNegativeInteger | Nothing
export function subtract(
  rhs: NonNegativeInteger | Nothing,
  lhs: NonPositiveInteger | Nothing,
): NonPositiveInteger | Nothing
export function subtract(
  rhs: Integer | Nothing,
  lhs: Integer | Nothing,
): Integer | Nothing
export function subtract(
  rhs: Integer | Nothing,
  lhs: Integer | Nothing,
): Integer | Nothing {
  if (isNothing(rhs) || isNothing(lhs)) return Nothing

  const result = lhs - rhs

  return isSafe(result) ? result : Nothing
}
