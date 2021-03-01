import * as Util from './types/Util.js'
import * as Arr from './types/Arr.js'
import { NUMBERS } from './constants.js'
import * as Integer from './Integer/index.js'
import * as Func from './Func.js'

export * from './types/Arr.js'

const ZERO = NUMBERS.ZERO
const ONE = NUMBERS.ONE

const toImmutable = <Value>(arr: Value[]): Arr.Array<Value> => {
  return arr
}

const toMutable = <Value>(arr: Arr.Array<Value>): Value[] => {
  return arr as Value[] // type-coverage:ignore-line
}

export const type = {
  toImmutable,
  toMutable,
} as const

export function isArray<Value extends Util.Mixed>(
  value: Value,
): value is Util.ExtractUnsafe<Value, Arr.UnknownArray>
export function isArray(value: unknown): value is Arr.UnknownArray
export function isArray(value: unknown): boolean {
  return Array.isArray(value)
}

export const empty = (): Arr.EmptyArray => {
  return []
}

function arrFrom<Value>(
  arrLike: Iterable<Value> | ArrayLike<Value>,
): Arr.Array<Value>
function arrFrom<Value, OtherValue>(
  arrLike: Iterable<Value> | ArrayLike<Value>,
  fn: (value: Value, index: Integer.NonNegativeInteger) => OtherValue,
): Arr.Array<OtherValue>
function arrFrom<Value, OtherValue>(
  arrLike: Iterable<Value> | ArrayLike<Value>,
  maybeFn?: (value: Value, index: Integer.NonNegativeInteger) => OtherValue,
): Arr.Array<Value> | Arr.Array<OtherValue> {
  type Fn = Util.Exclude<typeof maybeFn, undefined>

  return maybeFn !== undefined
    ? Array.from(
        arrLike,
        // type-coverage:ignore-next-line
        maybeFn as (
          value: Func.FirstParam<Fn>,
          index: number,
        ) => Func.Result<Fn>,
      )
    : Array.from(arrLike)
}
export { arrFrom as from }

const arrSize = (arr: Arr.UnknownArray): Integer.NonNegativeInteger => {
  return arr.length as Integer.NonNegativeInteger // type-coverage:ignore-line
}
export { arrSize as size }

export const isEmpty = (arr: Arr.UnknownArray): arr is Arr.EmptyArray => {
  return arrSize(arr) === ZERO
}

export const isNonEmpty = <Value>(
  arr: Arr.Array<Value>,
): arr is Arr.NonEmptyArray<Value> => {
  return !isEmpty(arr)
}

export const at = <Value>(
  index: Integer.NonNegativeInteger,
  arr: Arr.Array<Value>,
): Value | undefined => {
  return arr[index]
}

export const head = <Value>(arr: Arr.Array<Value>): Value | undefined => {
  return at(ZERO, arr)
}

export const init = <Value>(arr: Arr.Array<Value>): Arr.Array<Value> => {
  return dropLast(ONE, arr)
}

export const tail = <Value>(arr: Arr.Array<Value>): Arr.Array<Value> => {
  return drop(ONE, arr)
}

export const last = <Value>(arr: Arr.Array<Value>): Value | undefined => {
  const size = arrSize(arr)

  return Integer.isPositive(size) ? at(Integer.decrement(size), arr) : undefined
}

export const contains = <Value, ArrValue extends Value>(
  value: Value,
  arr: Arr.Array<ArrValue>,
): value is ArrValue => {
  return arr.includes(
    value as ArrValue, // type-coverage:ignore-line
  )
}

export const join = (separator: string, arr: Arr.UnknownArray): string => {
  return arr.join(separator)
}

export function slice<Value>(
  startIndex: Integer.NonNegativeInteger,
  endIndex: Integer.NonNegativeInteger,
  arr: Arr.Array<Value>,
): Arr.Array<Value>
export function slice<Value>(
  startIndex: Integer.NonNegativeInteger,
  arr: Arr.Array<Value>,
): Arr.Array<Value>
export function slice<Value>(
  ...args:
    | readonly [
        startIndex: Integer.NonNegativeInteger,
        endIndex: Integer.NonNegativeInteger,
        arr: Arr.Array<Value>,
      ]
    | readonly [startIndex: Integer.NonNegativeInteger, arr: Arr.Array<Value>]
): Arr.Array<Value> {
  const startIndex: Integer.NonNegativeInteger = args[0]
  const endIndex: Integer.NonNegativeInteger =
    args.length === 2
      ? ((size) => (Integer.isPositive(size) ? size : ZERO))(arrSize(args[1]))
      : args[1]
  const arr: Arr.Array<Value> = args.length === 3 ? args[2] : args[1]

  if (endIndex < startIndex) {
    return shallowCopy(arr)
  }

  return arr.slice(startIndex, endIndex)
}

export const uniq = <Value>(arr: Arr.Array<Value>): Arr.Array<Value> => {
  return isNonEmpty(arr) ? [...new Set(arr)] : []
}

export const flatten = <Value>(
  arr: Arr.NestedArray<Value>,
): Arr.Array<Value> => {
  return reduce<
    Value | Arr.NestedArray<Value>,
    Arr.Array<Value | Arr.NestedArray<Value>>,
    Arr.Array<Value>
  >(
    (acc, value) => {
      return isArray(value)
        ? appendAll(flatten(value), acc)
        : append(value, acc)
    },
    [],
    arr,
  )
}

export const adjust = <Value>(
  fn: (value: Value) => Value,
  indexOrFindIndex:
    | Integer.NonNegativeInteger
    | ((value: Value, index: Integer.NonNegativeInteger) => boolean),
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  const index = Func.isFunction(indexOrFindIndex)
    ? findIndex(indexOrFindIndex, arr)
    : indexOrFindIndex

  if (index === undefined || index > Integer.decrement(arrSize(arr))) {
    return shallowCopy(arr)
  }

  const arrCopy = toMutable(shallowCopy(arr))
  arrCopy[index] = fn(
    at(index, arrCopy) as Value, // type-coverage:ignore-line
  )
  return arrCopy
}

export const append = <Value>(
  value: Value,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  return arr.concat([value])
}

export const appendAll = <Value>(
  values: Arr.Array<Value>,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  return isNonEmpty(values) ? arr.concat(values) : shallowCopy(arr)
}

export const prepend = <Value>(
  value: Value,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  return [value].concat(arr)
}

export const prependAll = <Value>(
  values: Arr.Array<Value>,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  return isNonEmpty(values) ? values.concat(arr) : shallowCopy(arr)
}

export const insert = <Value>(
  indexOrFindIndex:
    | Integer.NonNegativeInteger
    | ((value: Value, index: Integer.NonNegativeInteger) => boolean),
  value: Value,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  const index = Func.isFunction(indexOrFindIndex)
    ? findIndex(indexOrFindIndex, arr)
    : indexOrFindIndex

  if (index === undefined || index > Integer.decrement(arrSize(arr))) {
    return shallowCopy(arr)
  }

  const arrCopy = toMutable(shallowCopy(arr))
  arrCopy.splice(index, ZERO, value)
  return arrCopy
}

export const insertAll = <Value>(
  indexOrFindIndex:
    | Integer.NonNegativeInteger
    | ((value: Value, index: Integer.NonNegativeInteger) => boolean),
  values: Arr.Array<Value>,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  if (arrSize(values) === ZERO) {
    return shallowCopy(arr)
  }

  const index = Func.isFunction(indexOrFindIndex)
    ? findIndex(indexOrFindIndex, arr)
    : indexOrFindIndex

  if (index === undefined || index > Integer.decrement(arrSize(arr))) {
    return shallowCopy(arr)
  }

  const arrCopy = toMutable(shallowCopy(arr))
  arrCopy.splice(index, ZERO, ...values)
  return arrCopy
}

export const drop = <Value>(
  count: Integer.NonNegativeInteger,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  if (count === ZERO) {
    return shallowCopy(arr)
  }

  return arr.slice(count)
}

export const dropLast = <Value>(
  count: Integer.NonNegativeInteger,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  if (count === ZERO) {
    return shallowCopy(arr)
  }

  return arr.slice(ZERO, -count)
}

export const dropAt = <Value>(
  indexOrFindIndex:
    | Integer.NonNegativeInteger
    | ((value: Value, index: Integer.NonNegativeInteger) => boolean),
  count: Integer.NonNegativeInteger,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  if (count === ZERO) {
    return shallowCopy(arr)
  }

  const index = Func.isFunction(indexOrFindIndex)
    ? findIndex(indexOrFindIndex, arr)
    : indexOrFindIndex

  if (index === undefined || index > Integer.decrement(arrSize(arr))) {
    return shallowCopy(arr)
  }

  const arrCopy = toMutable(shallowCopy(arr))
  arrCopy.splice(index, count)
  return arrCopy
}

export const dropOneAt = <Value>(
  indexOrFindIndex:
    | Integer.NonNegativeInteger
    | ((value: Value, index: Integer.NonNegativeInteger) => boolean),
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  return dropAt(indexOrFindIndex, ONE, arr)
}

export const reverse = <Value>(arr: Arr.Array<Value>): Arr.Array<Value> => {
  return toMutable(shallowCopy(arr)).reverse()
}

export const forEach = <Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => void,
  arr: Arr.Array<Value>,
): void => {
  type Fn = typeof fn

  arr.forEach(
    // type-coverage:ignore-next-line
    Func.binary(fn) as (
      value: Func.FirstParam<Fn>,
      index: number,
    ) => Func.Result<Fn>,
  )
}

export const indexOf = <Value>(
  value: Value,
  arr: Arr.Array<Value>,
): Integer.NonNegativeInteger | undefined => {
  const index = arr.indexOf(value) as Integer.Integer // type-coverage:ignore-line

  return Integer.isNonNegative(index) ? index : undefined
}

export const lastIndexOf = <Value>(
  value: Value,
  arr: Arr.Array<Value>,
): Integer.NonNegativeInteger | undefined => {
  const index = arr.lastIndexOf(value) as Integer.Integer // type-coverage:ignore-line

  return Integer.isNonNegative(index) ? index : undefined
}

export const findIndex = <Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => boolean,
  arr: Arr.Array<Value>,
): Integer.NonNegativeInteger | undefined => {
  type Fn = typeof fn

  // type-coverage:ignore-next-line
  const index = arr.findIndex(
    // type-coverage:ignore-next-line
    Func.binary(fn) as (
      value: Func.FirstParam<Fn>,
      index: number,
    ) => Func.Result<Fn>,
  ) as Integer.Integer

  return Integer.isNonNegative(index) ? index : undefined
}

export function find<Value, CastedValue extends Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => value is CastedValue,
  arr: Arr.Array<Value>,
): CastedValue | undefined
export function find<Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => boolean,
  arr: Arr.Array<Value>,
): Value | undefined
export function find<Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => boolean,
  arr: Arr.Array<Value>,
): Value | undefined {
  type Fn = typeof fn

  return arr.find(
    // type-coverage:ignore-next-line
    Func.binary(fn) as (
      value: Func.FirstParam<Fn>,
      index: number,
    ) => Func.Result<Fn>,
  )
}

export function some<Value, CastedValue extends Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => value is CastedValue,
  arr: Arr.Array<Value>,
): arr is Arr.Array<Value | CastedValue>
export function some<Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => boolean,
  arr: Arr.Array<Value>,
): boolean
export function some<Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => boolean,
  arr: Arr.Array<Value>,
): boolean {
  type Fn = typeof fn

  return arr.some(
    // type-coverage:ignore-next-line
    Func.binary(fn) as (
      value: Func.FirstParam<Fn>,
      index: number,
    ) => Func.Result<Fn>,
  )
}

export function every<Value, CastedValue extends Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => value is CastedValue,
  arr: Arr.Array<Value>,
): arr is Arr.Array<CastedValue>
export function every<Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => boolean,
  arr: Arr.Array<Value>,
): boolean
export function every<Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => boolean,
  arr: Arr.Array<Value>,
): boolean {
  type Fn = typeof fn

  return arr.every(
    // type-coverage:ignore-next-line
    Func.binary(fn) as (
      value: Func.FirstParam<Fn>,
      index: number,
    ) => Func.Result<Fn>,
  )
}

export const map = <Value, OtherValue>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => OtherValue,
  arr: Arr.Array<Value>,
): Arr.Array<OtherValue> => {
  type Fn = typeof fn

  return arr.map(
    // type-coverage:ignore-next-line
    Func.binary(fn) as (
      value: Func.FirstParam<Fn>,
      index: number,
    ) => Func.Result<Fn>,
  )
}

export function filter<Value, CastedValue extends Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => value is CastedValue,
  arr: Arr.Array<Value>,
): Arr.Array<CastedValue>
export function filter<Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => boolean,
  arr: Arr.Array<Value>,
): Arr.Array<Value>
export function filter<Value>(
  fn: (value: Value, index: Integer.NonNegativeInteger) => boolean,
  arr: Arr.Array<Value>,
): Arr.Array<Value> {
  type Fn = typeof fn

  return arr.filter(
    // type-coverage:ignore-next-line
    Func.binary(fn) as (
      value: Func.FirstParam<Fn>,
      index: number,
    ) => Func.Result<Fn>,
  )
}

export const reduce = <Value, Acc, Result extends Acc = Acc>(
  fn: (acc: Acc, value: Value, index: Integer.NonNegativeInteger) => Acc,
  initialValue: Acc,
  arr: Arr.Array<Value>,
): Result => {
  type Fn = typeof fn

  // type-coverage:ignore-next-line
  return arr.reduce<Acc>(
    // type-coverage:ignore-next-line
    Func.arity3(fn) as (
      acc: Func.FirstParam<Fn>,
      value: Func.SecondParam<Fn>,
      index: number,
    ) => Func.Result<Fn>,
    initialValue,
  ) as Result
}

export const sort = <Value>(
  fn: (value1: Value, value2: Value) => Arr.SortResult,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  return toMutable(shallowCopy(arr)).sort(fn)
}

export const sortStable = <Value>(
  fn: (value1: Value, value2: Value) => Arr.SortResult,
  arr: Arr.Array<Value>,
): Arr.Array<Value> => {
  return toMutable(shallowCopy(arr)).sort((a, b) => {
    const result = fn(a, b)

    return result === ZERO ? arr.indexOf(a) - arr.indexOf(b) : result
  })
}

export const shallowEquals = <Value>(
  arr1: Arr.Array<Value>,
  arr2: Arr.Array<Value>,
): boolean => {
  return arrSize(arr1) === arrSize(arr2)
    ? every((value1, index) => Object.is(value1, at(index, arr2)), arr1)
    : false
}

export const shallowCopy = <Value>(arr: Arr.Array<Value>): Arr.Array<Value> => {
  return arr.slice()
}
