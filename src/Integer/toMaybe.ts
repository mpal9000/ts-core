import {
  Nothing,
  NegativeInteger,
  NonPositiveInteger,
  NonNegativeInteger,
  PositiveInteger,
  Integer,
} from '../types/Integer.js'
import { isNothing } from './isNothing.js'
import * as Maybe from '../types/Maybe.js'

export function toMaybe(value: Nothing): Maybe.Nothing
export function toMaybe(value: NegativeInteger): NegativeInteger
export function toMaybe(value: PositiveInteger): PositiveInteger
export function toMaybe(value: NonPositiveInteger): NonPositiveInteger
export function toMaybe(value: NonNegativeInteger): NonNegativeInteger
export function toMaybe(value: Integer): Integer
export function toMaybe(
  value: NegativeInteger | Nothing,
): Maybe.Maybe<NegativeInteger>
export function toMaybe(
  value: PositiveInteger | Nothing,
): Maybe.Maybe<PositiveInteger>
export function toMaybe(
  value: NonPositiveInteger | Nothing,
): Maybe.Maybe<NonPositiveInteger>
export function toMaybe(
  value: NonNegativeInteger | Nothing,
): Maybe.Maybe<NonNegativeInteger>
export function toMaybe(value: Integer | Nothing): Maybe.Maybe<Integer>
export function toMaybe(value: Integer | Nothing): Maybe.Maybe<Integer> {
  return isNothing(value) ? undefined : value
}
