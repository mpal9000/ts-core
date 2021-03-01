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

export function decrement(value: Nothing): Nothing
export function decrement(value: PositiveInteger): NonNegativeInteger
export function decrement(value: NonPositiveInteger): NegativeInteger
export function decrement(value: Integer): Integer
export function decrement(
  value: PositiveInteger | Nothing,
): NonNegativeInteger | Nothing
export function decrement(
  value: NonPositiveInteger | Nothing,
): NegativeInteger | Nothing
export function decrement(value: Integer | Nothing): Integer | Nothing
export function decrement(value: Integer | Nothing): Integer | Nothing {
  if (isNothing(value)) return Nothing

  const result = value - 1

  return isSafe(result) ? result : Nothing
}
