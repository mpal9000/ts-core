import {
  ExecutionContext,
  IsAssertion,
  TrueAssertion,
  FalseAssertion,
} from 'ava'
import {
  Nothing as NothingI,
  ZeroInteger,
  NegativeInteger,
  NonPositiveInteger,
  NonNegativeInteger,
  PositiveInteger,
  Integer,
} from './types/Integer.js'
import { isNothing as isNothingI } from './Integer/isNothing.js'
import { isNegative as isNI } from './Integer/isNegative.js'
import { isNonPositive as isNPI } from './Integer/isNonPositive.js'
import { isNonNegative as isNNI } from './Integer/isNonNegative.js'
import { isPositive as isPI } from './Integer/isPositive.js'
import { isInteger as isI } from './Integer/isInteger.js'
import {
  Nothing as NothingF,
  ZeroFloat,
  NegativeFloat,
  NonPositiveFloat,
  NonNegativeFloat,
  PositiveFloat,
  Float,
} from './types/Float.js'
import { isNothing as isNothingF } from './Float/isNothing.js'
import { isNegative as isNF } from './Float/isNegative.js'
import { isNonPositive as isNPF } from './Float/isNonPositive.js'
import { isNonNegative as isNNF } from './Float/isNonNegative.js'
import { isPositive as isPF } from './Float/isPositive.js'
import { isFloat as isF } from './Float/isFloat.js'

export type F = Float
export type ZF = ZeroFloat
export type NF = NegativeFloat
export type NPF = NonPositiveFloat
export type NNF = NonNegativeFloat
export type PF = PositiveFloat

export type MF = Float | NothingF
export type MZF = ZeroFloat | NothingF
export type MNF = NegativeFloat | NothingF
export type MNPF = NonPositiveFloat | NothingF
export type MNNF = NonNegativeFloat | NothingF
export type MPF = PositiveFloat | NothingF

export type I = Integer
export type ZI = ZeroInteger
export type NI = NegativeInteger
export type NPI = NonPositiveInteger
export type NNI = NonNegativeInteger
export type PI = PositiveInteger

export type MI = Integer | NothingI
export type MZI = ZeroInteger | NothingI
export type MNI = NegativeInteger | NothingI
export type MNPI = NonPositiveInteger | NothingI
export type MNNI = NonNegativeInteger | NothingI
export type MPI = PositiveInteger | NothingI

// eslint-disable-next-line @typescript-eslint/ban-types
type Mixed = {} | null | undefined

export type IsEqual<TypeA, TypeB> = (<Type>() => Type extends TypeA
  ? 1
  : 2) extends <Type>() => Type extends TypeB ? 1 : 2
  ? true
  : false

export type IsAssignable<TypeA, TypeB> = TypeB extends TypeA ? true : false

interface ExpectedType<Type> {
  readonly tag: unique symbol
  readonly type: Type
}

export function isType<Expected = never>() {
  return <Actual>(
    actual: IsEqual<Actual, Expected> extends true
      ? Actual
      : ExpectedType<Expected>,
  ): Actual => {
    // type-coverage:ignore-next-line
    return actual as Actual
  }
}

export function isTypeAssignable<Expected = never>() {
  return <Actual>(
    actual: IsAssignable<Expected, Actual> extends true
      ? Actual
      : ExpectedType<Expected>,
  ): Actual => {
    // type-coverage:ignore-next-line
    return actual as Actual
  }
}

export const wrapIs = <Context = unknown>(t: ExecutionContext<Context>) => {
  return function is<Expected extends Mixed, Actual extends Mixed>(
    expected: Expected,
    actual: Mixed extends Actual
      ? unknown
      : Expected extends Actual
      ? Actual
      : ExpectedType<Expected>,
  ): asserts actual is Expected extends Actual ? Expected : never {
    return t.is.call<
      ExecutionContext<Context>,
      [unknown, unknown] | [unknown, unknown, string | undefined],
      ReturnType<IsAssertion>
    >(t, actual, expected)
  }
}

export const wrapDeepEqual = <Context = unknown>(
  t: ExecutionContext<Context>,
) => {
  return function is<Expected extends Mixed, Actual extends Mixed>(
    expected: Expected,
    actual: Mixed extends Actual
      ? unknown
      : Expected extends Actual
      ? Actual
      : ExpectedType<Expected>,
  ): asserts actual is Expected extends Actual ? Expected : never {
    return t.deepEqual.call<
      ExecutionContext<Context>,
      [unknown, unknown] | [unknown, unknown, string | undefined],
      ReturnType<IsAssertion>
    >(t, actual, expected)
  }
}

export const wrapTrue = <Context = unknown>(t: ExecutionContext<Context>) => {
  return function isTrue<Actual extends Mixed>(
    actual: Mixed extends Actual
      ? unknown
      : true extends Actual
      ? Actual
      : true,
  ): asserts actual is true extends Actual ? true : never {
    return t.true.call<
      ExecutionContext<Context>,
      [unknown] | [unknown, string | undefined],
      ReturnType<TrueAssertion>
    >(t, actual)
  }
}

export const wrapFalse = <Context = unknown>(t: ExecutionContext<Context>) => {
  return function isFalse<Actual extends Mixed>(
    actual: Mixed extends Actual
      ? unknown
      : false extends Actual
      ? Actual
      : false,
  ): asserts actual is false extends Actual ? false : never {
    return t.false.call<
      ExecutionContext<Context>,
      [unknown] | [unknown, string | undefined],
      ReturnType<FalseAssertion>
    >(t, actual)
  }
}

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number'
}

const getTypePrefixByPredicate = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any[]) => unknown, // type-coverage:ignore-line
): string => {
  switch (fn) {
    case isNF:
    case isNI:
      return 'negative '
    case isNPF:
    case isNPI:
      return 'non positive '
    case isNNF:
    case isNNI:
      return 'non negative '
    case isPF:
    case isPI:
      return 'positive '
    default:
      return ''
  }
}

const asMF = <Value extends MF>(
  predicate: (value: F) => value is Exclude<Value, NothingF>,
  value: number | NothingF,
): Value => {
  if (isF(value) && predicate(value)) return value

  if (!isNumber(value) && isNothingF(value)) {
    // type-coverage:ignore-next-line
    return value as Extract<Value, NothingF>
  }

  throw new TypeError(
    `Expected ${getTypePrefixByPredicate(predicate)}float, got ${String(
      value,
    )}`,
  )
}

const asMI = <Value extends MI>(
  predicate: (value: I) => value is Exclude<Value, NothingI>,
  value: number | NothingI,
): Value => {
  if (isI(value) && predicate(value)) return value

  if (!isNumber(value) && isNothingI(value)) {
    // type-coverage:ignore-next-line
    return value as Extract<Value, NothingI>
  }

  throw new TypeError(
    `Expected ${getTypePrefixByPredicate(predicate)}integer, got ${String(
      value,
    )}`,
  )
}

export const unknown = (): unknown => ({} as unknown)
export const mixed = (): Mixed => ({} as Mixed)

export const nan = (): number => Number.NaN
export const inf = (): number => Infinity
export const n = (v?: number): number => v ?? 1.1
export const u = (v?: number): unknown => v ?? 1.1

export const f = (v?: number): F => asMF<F>(isF, v ?? 1.1)
export const nf = (v?: number): NF => asMF<NF>(isNF, v ?? -1.1)
export const npf = (v?: number): NPF => asMF<NPF>(isNPF, v ?? 0.0)
export const nnf = (v?: number): NNF => asMF<NNF>(isNNF, v ?? 0.0)
export const pf = (v?: number): PF => asMF<PF>(isPF, v ?? 1.1)

export const mf = (v?: number): MF => asMF<MF>(isF, v ?? NothingF)
export const mnf = (v?: number): MNF => asMF<MNF>(isNF, v ?? NothingF)
export const mnpf = (v?: number): MNPF => asMF<MNPF>(isNPF, v ?? NothingF)
export const mnnf = (v?: number): MNNF => asMF<MNNF>(isNNF, v ?? NothingF)
export const mpf = (v?: number): MPF => asMF<MPF>(isPF, v ?? NothingF)

export const i = (v?: number): I => asMI<I>(isI, v ?? 1)
export const ni = (v?: number): NI => asMI<NI>(isNI, v ?? -1)
export const npi = (v?: number): NPI => asMI<NPI>(isNPI, v ?? 0)
export const nni = (v?: number): NNI => asMI<NNI>(isNNI, v ?? 0)
export const pi = (v?: number): PI => asMI<PI>(isPI, v ?? 1)

export const mi = (v?: number): MI => asMI<MI>(isI, v ?? NothingI)
export const mni = (v?: number): MNI => asMI<MNI>(isNI, v ?? NothingI)
export const mnpi = (v?: number): MNPI => asMI<MNPI>(isNPI, v ?? NothingI)
export const mnni = (v?: number): MNNI => asMI<MNNI>(isNNI, v ?? NothingI)
export const mpi = (v?: number): MPI => asMI<MPI>(isPI, v ?? NothingI)

export function apply<Value extends Mixed, Result>(
  fn: (value: Value) => Result,
  value: Value,
): Result
export function apply<Value, Result>(
  fn: (value: Value) => Result,
  value: Value,
): Result
export function apply<Value, Result>(
  fn: (value: Value) => Result,
  value: Value,
): Result {
  return fn(value)
}
