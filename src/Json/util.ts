import {
  Nothing,
  JsonPrimitive,
  JsonArray,
  JsonRecord,
  Json,
} from '../types/Json/index.js'

export const isNothing = (value: unknown): value is Nothing => {
  return value === undefined
}

const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

const isUnknownRecord = (
  value: unknown,
): value is { readonly [Key in PropertyKey]: unknown } => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const isErrorLike = (value: unknown): value is { readonly message: string } => {
  return isUnknownRecord(value) && 'message' in value && isString(value.message)
}

const isError = (value: unknown): value is Error => {
  return value instanceof Error
}

export const isPrimitive = <Value extends Json>(
  value: Value,
): value is Extract<Value, JsonPrimitive> => {
  return (
    value === null || ['boolean', 'number', 'string'].includes(typeof value)
  )
}

export const isArray = <Value extends Json>(
  value: Value,
): value is Extract<Value, JsonArray> => {
  return Array.isArray(value)
}

export const isRecord = <Value extends Json>(
  value: Value,
): value is Extract<Value, JsonRecord> => {
  return !isPrimitive(value) && !isArray(value)
}

export const isJson = (value: unknown): value is Json => {
  return (
    value === null ||
    ['boolean', 'number', 'string'].includes(typeof value) ||
    (Array.isArray(value) &&
      // type-coverage:ignore-next-line
      value.every(isJson)) ||
    (typeof value === 'object' &&
      value !== null &&
      Object.keys(value).every(isString) &&
      Object.values(value).every(isJson))
  )
}

export const normalizeJsonString = (value: string): string => {
  return value.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
}

export const ensureError = (
  defaultErrorMessage: string,
  maybeError: unknown,
): Error => {
  if (isError(maybeError)) return maybeError
  if (isString(maybeError)) return new Error(maybeError)
  if (isErrorLike(maybeError)) return new Error(maybeError.message)
  return new Error(defaultErrorMessage)
}
