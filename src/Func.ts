import microMemoize, { MicroMemoize } from 'micro-memoize'
import * as Util from './types/Util.js'
import * as Integer from './types/Integer.js'
import * as Arr from './types/Arr.js'
import * as Obj from './types/Obj.js'
import * as Func from './types/Func.js'

export * from './types/Func.js'

export function isFunction<Value extends Util.Mixed>(
  value: Value,
): value is Util.ExtractUnsafe<Value, Func.UnknownFunction>
export function isFunction(value: unknown): value is Func.UnknownFunction
export function isFunction(value: unknown): boolean {
  return typeof value === 'function'
}

export const run = <Result>(fn: () => Result): Result => {
  return fn()
}

export const call = <Param, Result>(
  fn: (arg: Param) => Result,
  arg: Param,
): Result => {
  return fn(arg)
}

export const unary = <Param1, Result>(
  fn: (
    arg1: Param1,
    ...restArgs: Arr.AnyArray // type-coverage:ignore-line
  ) => Result,
): ((arg1: Param1) => Result) => {
  return (arg1: Param1) => {
    return fn(arg1)
  }
}

export const binary = <Param1, Param2, Result>(
  fn: (
    arg1: Param1,
    arg2: Param2,
    ...restArgs: Arr.AnyArray // type-coverage:ignore-line
  ) => Result,
): ((arg1: Param1, arg2: Param2) => Result) => {
  return (arg1: Param1, arg2: Param2) => {
    return fn(arg1, arg2)
  }
}

export const arity3 = <Param1, Param2, Param3, Result>(
  fn: (
    arg1: Param1,
    arg2: Param2,
    arg3: Param3,
    ...restArgs: Arr.AnyArray // type-coverage:ignore-line
  ) => Result,
): ((arg1: Param1, arg2: Param2, arg3: Param3) => Result) => {
  return (arg1: Param1, arg2: Param2, arg3: Param3) => {
    return fn(arg1, arg2, arg3)
  }
}

export const noop = (): undefined => undefined

export const identity = <Param>(arg: Param): Param => {
  return arg
}

export const always = <Result>(result: Result): (() => Result) => {
  return () => result
}

export const times = <Result>(
  fn: (index: Integer.NonNegativeInteger) => Result,
  count: Integer.PositiveInteger,
): Arr.Immutable<Result[]> => {
  const results: Arr.Mutable<Result[]> = []

  for (let i = 0; i < count; i++) {
    results.push(
      fn(
        i as Integer.NonNegativeInteger, // type-coverage:ignore-line
      ),
    )
  }

  return results
}

export const memoize = <Fn extends Func.UnknownFunction>(
  fn: Fn,
  options?: Util.Assignable<
    MicroMemoize.Options,
    Obj.Immutable<{
      maxSize?: Integer.NonNegativeInteger
      isEqual?: (
        value1: Func.Params<Fn>[number],
        value2: Func.Params<Fn>[number],
      ) => boolean
    }>
  >[1],
): Fn => {
  const { maxSize = Infinity, isEqual } = options ?? {}

  return microMemoize(fn, { maxSize, isEqual })
}
