export interface Nothing {
  readonly Nothing: unique symbol
}
// type-coverage:ignore-next-line
export const Nothing = (undefined as unknown) as Nothing

export interface ZeroFloatTag {
  readonly ZeroFloat: unique symbol
}
export type ZeroFloat = number & ZeroFloatTag

export interface NegativeFloatTag {
  readonly NegativeFloat: unique symbol
}
export type NegativeFloat = number & NegativeFloatTag

export interface PositiveFloatTag {
  readonly PositiveFloat: unique symbol
}
export type PositiveFloat = number & PositiveFloatTag

export type NonNegativeFloat = ZeroFloat | PositiveFloat

export type NonPositiveFloat = ZeroFloat | NegativeFloat

export type Float = NegativeFloat | ZeroFloat | PositiveFloat

export type FractionDigitsNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20

export type Radix =
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
