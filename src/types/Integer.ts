export { Radix } from './Float.js'

export interface Nothing {
  readonly Nothing: unique symbol
}
// type-coverage:ignore-next-line
export const Nothing = (undefined as unknown) as Nothing

export interface ZeroIntegerTag {
  readonly ZeroInteger: unique symbol
}
export type ZeroInteger = number & ZeroIntegerTag

export interface NegativeIntegerTag {
  readonly NegativeInteger: unique symbol
}
export type NegativeInteger = number & NegativeIntegerTag

export interface PositiveIntegerTag {
  readonly PositiveInteger: unique symbol
}
export type PositiveInteger = number & PositiveIntegerTag

export type NonNegativeInteger = ZeroInteger | PositiveInteger

export type NonPositiveInteger = ZeroInteger | NegativeInteger

export type Integer = NegativeInteger | ZeroInteger | PositiveInteger
