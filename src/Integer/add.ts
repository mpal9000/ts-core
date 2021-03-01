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

export function add(rhs: Nothing, lhs: Nothing): Nothing
export function add(rhs: Nothing, lhs: Integer): Nothing
export function add(rhs: Integer, lhs: Nothing): Nothing
export function add(rhs: Nothing, lhs: Integer | Nothing): Nothing
export function add(rhs: Integer | Nothing, lhs: Nothing): Nothing
export function add(
  rhs: NegativeInteger | Nothing,
  lhs: NonPositiveInteger | Nothing,
): NegativeInteger | Nothing
export function add(
  rhs: NonPositiveInteger | Nothing,
  lhs: NegativeInteger | Nothing,
): NegativeInteger | Nothing
export function add(
  rhs: PositiveInteger | Nothing,
  lhs: NonNegativeInteger | Nothing,
): PositiveInteger | Nothing
export function add(
  rhs: NonNegativeInteger | Nothing,
  lhs: PositiveInteger | Nothing,
): PositiveInteger | Nothing
export function add(
  rhs: NonPositiveInteger | Nothing,
  lhs: NonPositiveInteger | Nothing,
): NonPositiveInteger | Nothing
export function add(
  rhs: NonNegativeInteger | Nothing,
  lhs: NonNegativeInteger | Nothing,
): NonNegativeInteger | Nothing
export function add(
  rhs: Integer | Nothing,
  lhs: Integer | Nothing,
): Integer | Nothing
export function add(
  rhs: Integer | Nothing,
  lhs: Integer | Nothing,
): Integer | Nothing {
  if (isNothing(rhs) || isNothing(lhs)) return Nothing

  const result = lhs + rhs

  return isSafe(result) ? result : Nothing
}
