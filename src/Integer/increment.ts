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

export function increment(value: Nothing): Nothing
export function increment(value: NegativeInteger): NonPositiveInteger
export function increment(value: NonNegativeInteger): PositiveInteger
export function increment(value: Integer): Integer
export function increment(
  value: NegativeInteger | Nothing,
): NonPositiveInteger | Nothing
export function increment(
  value: NonNegativeInteger | Nothing,
): PositiveInteger | Nothing
export function increment(value: Integer | Nothing): Integer | Nothing
export function increment(value: Integer | Nothing): Integer | Nothing {
  if (isNothing(value)) return Nothing

  const result = value + 1

  return isSafe(result) ? result : Nothing
}
