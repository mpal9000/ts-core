import {
  NegativeInteger,
  NonNegativeInteger,
  Integer,
} from '../types/Integer.js'

export function isNonNegative(value: NegativeInteger): value is never
export function isNonNegative(value: Integer): value is NonNegativeInteger
export function isNonNegative(value: Integer): value is NonNegativeInteger {
  return value >= 0
}
