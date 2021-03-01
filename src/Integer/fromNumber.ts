import {
  Nothing,
  NegativeInteger,
  NonPositiveInteger,
  NonNegativeInteger,
  PositiveInteger,
  Integer,
} from '../types/Integer.js'
import { isInteger } from './isInteger.js'

export function fromNumber(value: NegativeInteger): NegativeInteger
export function fromNumber(value: PositiveInteger): PositiveInteger
export function fromNumber(value: NonPositiveInteger): NonPositiveInteger
export function fromNumber(value: NonNegativeInteger): NonNegativeInteger
export function fromNumber(value: Integer): Integer
export function fromNumber(value: number): Integer | Nothing
export function fromNumber(value: number): Integer | Nothing {
  return isInteger(value) ? value : Nothing
}
