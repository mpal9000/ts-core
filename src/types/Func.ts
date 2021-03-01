import * as Arr from './Arr.js'

export type UnknownFunction = (
  ...args: Arr.AnyArray // type-coverage:ignore-line
) => unknown

export type FirstParam<Fn extends UnknownFunction> = Fn extends (
  arg: infer P,
  ...args: Arr.AnyArray // type-coverage:ignore-line
) => unknown
  ? P
  : never

export type SecondParam<Fn extends UnknownFunction> = Fn extends (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arg1: any, // type-coverage:ignore-line
  arg2: infer P,
  ...args: Arr.AnyArray // type-coverage:ignore-line
) => unknown
  ? P
  : never

export type Params<Fn extends UnknownFunction> = Fn extends (
  ...args: infer P
) => unknown
  ? P
  : never

export type Result<Fn extends UnknownFunction> = ReturnType<Fn>
