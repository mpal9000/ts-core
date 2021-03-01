import * as Integer from './Integer.js'

export type EmptyArray = readonly []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArray = readonly any[] // type-coverage:ignore-line

export type UnknownArray = readonly unknown[]

export type UnknownMutableArray = unknown[]

export type Array<Value> = readonly Value[]

export type NonEmptyArray<Value> = readonly [Value, ...Value[]]

export type NestedArray<Value> = readonly (Value | NestedArray<Value>)[]

export type Immutable<
  Input extends UnknownMutableArray
> = readonly Input[number][]

export type Mutable<Input extends UnknownArray> = Input[number][]

export type SortResult = Integer.Integer | -1 | 0 | 1
