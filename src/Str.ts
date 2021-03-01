import * as Util from './types/Util.js'
import * as Str from './types/Str.js'
import { NUMBERS } from './constants.js'
import * as Integer from './Integer/index.js'
import * as Arr from './Arr.js'

export * from './types/Str.js'

export type StringReplacer = (
  substring: string,
  ...args: Arr.AnyArray // type-coverage:ignore-line
) => string

type StringSearcher = {
  [Symbol.replace](str: string, replaceValue: string): string
}

type StringSearcherWithReplacer = {
  [Symbol.replace](str: string, replacer: StringReplacer): string
}

const ZERO = NUMBERS.ZERO
const ONE = NUMBERS.ONE

const EMPTY_STRING = ''

export function isString<Value extends Util.Mixed>(
  value: Value,
): value is Util.ExtractUnsafe<Value, string>
export function isString(value: unknown): value is string
export function isString(value: unknown): boolean {
  return typeof value === 'string'
}

export const empty = (): typeof EMPTY_STRING => {
  return EMPTY_STRING
}

const stringFrom = (value: Util.NonNullableValue): string => {
  return String(value)
}
export { stringFrom as from }

export const isEmpty = (str: string): str is typeof EMPTY_STRING => {
  return str === empty()
}

export const isNonEmpty = (str: string): boolean => {
  return !isEmpty(str)
}

export const isBlank = (str: string): boolean => {
  return /^\s*$/.test(str)
}

export const isNonBlank = (str: string): boolean => {
  return !isBlank(str)
}

export const size = (str: string): Integer.NonNegativeInteger => {
  // type-coverage:ignore-next-line
  return str.length as Integer.NonNegativeInteger
}

export const startsWith = <
  SearchStr extends string,
  Input extends Str.IsLiteral<Input> extends true
    ? `${SearchStr}${string}`
    : string
>(
  searchStr: SearchStr,
  str: Input,
): str is Str.IsLiteral<Input> extends true
  ? Input
  : `${SearchStr}${string}` extends Input
  ? `${SearchStr}${string}`
  : never => {
  return str.startsWith(searchStr)
}

export const endsWith = <
  SearchStr extends string,
  Input extends Str.IsLiteral<Input> extends true
    ? `${string}${SearchStr}`
    : string
>(
  searchStr: SearchStr,
  str: Input,
): str is Str.IsLiteral<Input> extends true
  ? Input
  : `${string}${SearchStr}` extends Input
  ? `${string}${SearchStr}`
  : never => {
  return str.endsWith(searchStr)
}

export const contains = <
  SearchStr extends string,
  Input extends Str.IsLiteral<Input> extends true
    ? `${string}${SearchStr}${string}`
    : string
>(
  searchStr: SearchStr,
  str: Input,
): str is Str.IsLiteral<Input> extends true
  ? Input
  : `${string}${SearchStr}${string}` extends Input
  ? `${string}${SearchStr}${string}`
  : never => {
  return str.includes(searchStr)
}

export const trim = (str: string): string => {
  return str.trim()
}

export function slice(
  startIndex: Integer.NonNegativeInteger,
  endIndex: Integer.NonNegativeInteger,
  str: string,
): string
export function slice(
  startIndex: Integer.NonNegativeInteger,
  str: string,
): string
export function slice(
  ...args:
    | readonly [
        startIndex: Integer.NonNegativeInteger,
        endIndex: Integer.NonNegativeInteger,
        str: string,
      ]
    | readonly [startIndex: Integer.NonNegativeInteger, str: string]
): string {
  return args.length === 2
    ? Arr.join('', Arr.slice(args[0], [...args[1]]))
    : Arr.join('', Arr.slice(args[0], args[1], [...args[2]]))
}

export function split(
  splitter: RegExp | string,
  limit: Integer.NonNegativeInteger,
  str: string,
): readonly string[]
export function split(splitter: RegExp | string, str: string): readonly string[]
export function split(
  ...args:
    | readonly [
        splitter: RegExp | string,
        limit: Integer.NonNegativeInteger,
        str: string,
      ]
    | readonly [splitter: RegExp | string, str: string]
): readonly string[] {
  return args.length === 3
    ? args[2].split(args[0], args[1])
    : args[1].split(args[0], undefined)
}

export const indexOf = (
  subStr: string,
  str: string,
): Integer.NonNegativeInteger | undefined => {
  // type-coverage:ignore-next-line
  const index = str.indexOf(subStr) as Integer.Integer

  return Integer.isNonNegative(index) ? index : undefined
}

export const lastIndexOf = (
  subStr: string,
  str: string,
): Integer.NonNegativeInteger | undefined => {
  // type-coverage:ignore-next-line
  const index = str.lastIndexOf(subStr) as Integer.Integer

  return Integer.isNonNegative(index) ? index : undefined
}

export const upperCase = <Input extends string>(
  str: Input,
): Uppercase<Input> => {
  // type-coverage:ignore-next-line
  return str.toUpperCase() as Uppercase<Input>
}

export const lowerCase = <Input extends string>(
  str: Input,
): Lowercase<Input> => {
  // type-coverage:ignore-next-line
  return str.toLowerCase() as Lowercase<Input>
}

export const capitalizeFirstChar = <Input extends string>(
  str: Input,
): Capitalize<Input> => {
  // type-coverage:ignore-next-line
  return `${upperCase(str.charAt(ZERO))}${slice(ONE, str)}` as Capitalize<Input>
}

export function replace(
  searchValue: StringSearcher,
  replaceValue: string,
  str: string,
): string
export function replace(
  searchValue: StringSearcherWithReplacer,
  replacer: StringReplacer,
  str: string,
): string
export function replace(
  ...args:
    | readonly [searchValue: StringSearcher, replaceValue: string, str: string]
    | readonly [
        searchValue: StringSearcherWithReplacer,
        replacer: StringReplacer,
        str: string,
      ]
): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return args[2].replace(args[0] as any, args[1] as any) // type-coverage:ignore-line
}
