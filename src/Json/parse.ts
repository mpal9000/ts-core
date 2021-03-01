import { Nothing, JsonArray, JsonRecord, Json } from '../types/Json/index.js'
import * as Either from '../Either.js'
import { isNothing, isArray, normalizeJsonString, ensureError } from './util.js'

export type JsonParseReviver = (
  this: JsonArray | JsonRecord,
  key: string,
  value: Json,
) => Json | Nothing

export type JsonParseOptions = {
  readonly reviver?: JsonParseReviver
}

export type JsonParseResult = Either.Either<Error, Json>

const undefinedToNull = <Value>(
  value: Value,
): Exclude<Value, undefined> | null => {
  return value === undefined
    ? null
    : // type-coverage:ignore-next-line
      (value as Exclude<Value, undefined>)
}

export function parse(options: JsonParseOptions, value: string): JsonParseResult
export function parse(value: string): JsonParseResult
export function parse(
  ...args:
    | readonly [options: JsonParseOptions, value: string]
    | readonly [value: string]
): JsonParseResult {
  const [options, value] =
    args.length === 2 ? [args[0], args[1]] : [{}, args[0]]
  const { reviver } = options

  return Either.tryCatch(
    () => {
      return undefinedToNull(
        JSON.parse(
          normalizeJsonString(value),
          reviver === undefined
            ? undefined
            : function jsonParseReviver(
                this: JsonArray | JsonRecord,
                key: string,
                currentValue: Json,
              ) {
                const nextValue = reviver.call(this, key, currentValue)

                if (isNothing(nextValue)) {
                  if (isArray(this)) return null
                  return undefined
                }

                return nextValue
              },
        ) as Json | undefined,
      )
    },
    (maybeError) => ensureError('Parsing error', maybeError),
  )
}
