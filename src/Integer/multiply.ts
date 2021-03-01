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

export function multiply(rhs: Nothing, lhs: Nothing): Nothing
export function multiply(rhs: Nothing, lhs: Integer): Nothing
export function multiply(rhs: Integer, lhs: Nothing): Nothing
export function multiply(rhs: Nothing, lhs: Integer | Nothing): Nothing
export function multiply(rhs: Integer | Nothing, lhs: Nothing): Nothing
export function multiply(
  rhs: NegativeInteger | Nothing,
  lhs: NegativeInteger | Nothing,
): PositiveInteger | Nothing
export function multiply(
  rhs: PositiveInteger | Nothing,
  lhs: PositiveInteger | Nothing,
): PositiveInteger | Nothing
export function multiply(
  rhs: NegativeInteger | Nothing,
  lhs: PositiveInteger | Nothing,
): NegativeInteger | Nothing
export function multiply(
  rhs: PositiveInteger | Nothing,
  lhs: NegativeInteger | Nothing,
): NegativeInteger | Nothing
export function multiply(
  rhs: NonPositiveInteger | Nothing,
  lhs: NonPositiveInteger | Nothing,
): NonNegativeInteger | Nothing
export function multiply(
  rhs: NonNegativeInteger | Nothing,
  lhs: NonNegativeInteger | Nothing,
): NonNegativeInteger | Nothing
export function multiply(
  rhs: NonPositiveInteger | Nothing,
  lhs: NonNegativeInteger | Nothing,
): NonPositiveInteger | Nothing
export function multiply(
  rhs: NonNegativeInteger | Nothing,
  lhs: NonPositiveInteger | Nothing,
): NonPositiveInteger | Nothing
export function multiply(
  rhs: Integer | Nothing,
  lhs: Integer | Nothing,
): Integer | Nothing
export function multiply(
  rhs: Integer | Nothing,
  lhs: Integer | Nothing,
): Integer | Nothing {
  if (isNothing(rhs) || isNothing(lhs)) return Nothing

  const result = lhs * rhs

  return isSafe(result) ? result : Nothing
}
