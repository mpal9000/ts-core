import * as Util from './types/Util.js'
import * as Maybe from './types/Maybe.js'
import * as Arr from './Arr.js'
import * as Obj from './Obj.js'

export * from './types/Maybe.js'

type JustProperties<Input extends Obj.UnknownObject> = {
  [Key in keyof Input]-?: Util.ExcludeUnsafe<Input[Key], Maybe.Nothing>
}

export function isJust<Value extends Util.Mixed>(
  value: Value,
): value is Util.ExcludeUnsafe<Value, Maybe.Nothing>
export function isJust(value: unknown): value is Util.NonNullableValue
export function isJust(value: unknown): boolean {
  return value !== undefined && value !== null
}

export function isNothing<Value extends Util.Mixed>(
  value: Value,
): value is Util.ExtractUnsafe<Value, Maybe.Nothing>
export function isNothing(value: unknown): value is Maybe.Nothing
export function isNothing(value: unknown): boolean {
  return value === undefined || value === null
}

export const getOrElse = <Value extends Util.NonNullableValue>(
  onNothing: () => Value,
  maybe: Value | Maybe.Nothing,
): Value => {
  return isNothing(maybe) ? onNothing() : maybe
}

export const getOrElseUnion = <
  Value,
  DefaultValue extends Util.NonNullableValue
>(
  onNothing: () => DefaultValue,
  maybe: Value,
): Value extends Maybe.Nothing ? DefaultValue : Value => {
  // type-coverage:ignore-next-line
  return (isNothing(maybe) ? onNothing() : maybe) as Value extends Maybe.Nothing
    ? DefaultValue
    : Value
}

export const alt = <Value>(onNothing: () => Value, maybe: Value): Value => {
  return isNothing(maybe) ? onNothing() : maybe
}

export function map<Value, OtherValue extends Util.NonNullableValue>(
  onJust: (value: Util.ExcludeUnsafe<Value, Maybe.Nothing>) => OtherValue,
): (
  maybe: Value,
) => Value extends Maybe.Nothing
  ? Util.ExtractUnsafe<Value, Maybe.Nothing>
  : OtherValue
export function map<Value, OtherValue extends Util.NonNullableValue>(
  onJust: (value: Util.ExcludeUnsafe<Value, Maybe.Nothing>) => OtherValue,
  maybe: Value,
): Value extends Maybe.Nothing
  ? Util.ExtractUnsafe<Value, Maybe.Nothing>
  : OtherValue
export function map<Value, OtherValue extends Util.NonNullableValue>(
  ...args:
    | readonly [
        onJust: (value: Util.ExcludeUnsafe<Value, Maybe.Nothing>) => OtherValue,
        maybe: Value,
      ]
    | readonly [
        onJust: (value: Util.ExcludeUnsafe<Value, Maybe.Nothing>) => OtherValue,
      ]
):
  | ((
      maybe: Value,
    ) => Value extends Maybe.Nothing
      ? Util.ExtractUnsafe<Value, Maybe.Nothing>
      : OtherValue)
  | (Value extends Maybe.Nothing
      ? Util.ExtractUnsafe<Value, Maybe.Nothing>
      : OtherValue) {
  const onJust = args[0]

  const getResult = (maybe: Value) => {
    // type-coverage:ignore-next-line
    return (isJust(maybe)
      ? onJust(maybe)
      : maybe) as Value extends Maybe.Nothing
      ? Util.ExtractUnsafe<Value, Maybe.Nothing>
      : OtherValue
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export const fold = <Value, OtherValue>(
  onNothing: () => OtherValue,
  onJust: (value: Util.ExcludeUnsafe<Value, Maybe.Nothing>) => OtherValue,
  maybe: Value,
): OtherValue => {
  return isJust(maybe) ? onJust(maybe) : onNothing()
}

export const foldAll = <Value extends Obj.UnknownObject, OtherValue>(
  onNothing: () => OtherValue,
  onJust: (obj: JustProperties<Value>) => OtherValue,
  maybeObj: Value,
): OtherValue => {
  const justValues = Arr.reduce<
    readonly [Obj.Key<Value>, Obj.Value<Value>],
    Obj.Optional<JustProperties<Value>>,
    JustProperties<Value>
  >(
    (acc, [entryKey, entryValue]) => {
      return isJust(entryValue)
        ? {
            ...acc,
            // type-coverage:ignore-next-line
            ...({ [entryKey]: entryValue } as Obj.Optional<
              JustProperties<Value>
            >),
          }
        : acc
    },
    {},
    Obj.entries(maybeObj),
  )

  return Obj.size(maybeObj) !== Obj.size(justValues)
    ? onNothing()
    : onJust(justValues)
}
