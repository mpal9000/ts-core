import {
  NegativeInteger,
  NonNegativeInteger,
  Integer,
} from '../types/Integer.js'

export function isNegative(value: NonNegativeInteger): value is never
export function isNegative(value: Integer): value is NegativeInteger
export function isNegative(value: Integer): value is NegativeInteger {
  return value < 0
}
