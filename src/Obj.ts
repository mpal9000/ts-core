import * as Util from './types/Util.js'
import * as Integer from './types/Integer.js'
import * as Obj from './types/Obj.js'
import { NUMBERS } from './constants.js'
import * as Arr from './Arr.js'

export * from './types/Obj.js'

const ZERO = NUMBERS.ZERO

// eslint-disable-next-line @typescript-eslint/unbound-method
const hasOwnProperty = Object.prototype.hasOwnProperty

const normalizeKey = (key: PropertyKey): string | symbol => {
  return typeof key === 'number' ? String(key) : key
}

const normalizeKeys = (
  keys: readonly PropertyKey[],
): readonly (string | symbol)[] => {
  return Arr.map(normalizeKey, keys)
}

const toImmutable = <Input extends Obj.UnknownMutableObject>(
  obj: Input,
): Obj.Immutable<Input> => {
  return obj
}

const toMutable = <Input extends Obj.UnknownObject>(
  obj: Input,
): Obj.Mutable<Input> => {
  return obj
}

const someKeys = <
  Key extends PropertyKey,
  Input extends Obj.Object<{ [K in Key]: unknown }>
>(
  _keys: Arr.Array<Key>,
  obj: Input,
): Input => {
  return obj
}

const allKeys = <
  Key extends PropertyKey,
  Input extends Obj.Exact<Obj.Object<{ [K in Key]: unknown }>, Input>
>(
  _keys: Arr.Array<Key>,
  obj: Input,
): Input => {
  return obj
}

export const type = {
  toImmutable,
  toMutable,
  someKeys,
  allKeys,
} as const

export function isObject<Value extends Util.Mixed>(
  value: Value,
): value is Util.ExtractUnsafe<Value, Obj.UnknownObject>
export function isObject(value: unknown): value is Obj.UnknownObject
export function isObject(value: unknown): boolean {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  const tag = Object.prototype.toString.call(value)
  return tag === '[object Object]' || tag === '[object Window]'
}

// prettier-ignore
const objOwnKeys = <Input extends Obj.UnknownObject>(
  obj: Input,
): (
  Obj.OwnKeys<Input>
) => {
  // type-coverage:ignore-next-line
  return (Reflect.ownKeys(obj) as Arr.Array<keyof Input>) as (
    Obj.OwnKeys<Input>
  )
}
export { objOwnKeys as ownKeys }

// prettier-ignore
const objKeys = <Input extends Obj.UnknownObject>(
  obj: Input,
): (
  Obj.Keys<Input>
) => {
  // type-coverage:ignore-next-line
  return (Object.keys(obj) as Arr.Array<keyof Input>) as (
    Obj.Keys<Input>
  )
}
export { objKeys as keys }

// prettier-ignore
const objOwnValues = <Input extends Obj.UnknownObject>(
  obj: Input,
): (
  Obj.OwnValues<Input>
) => {
  return objOwnKeys(obj).map((key) => obj[key])
}
export { objOwnValues as ownValues }

// prettier-ignore
const objValues = <Input extends Obj.UnknownObject>(
  obj: Input,
): (
  Obj.Values<Input>
) => {
  // type-coverage:ignore-next-line
  return Object.values(obj) as (
    Obj.Values<Input>
  )
}
export { objValues as values }

// prettier-ignore
const objOwnEntries = <
  Input extends Obj.UnknownObject
>(
  obj: Input,
): (
  Obj.OwnEntries<Input>
) => {
  // type-coverage:ignore-next-line
  return (objOwnKeys(obj).map((key) => [key, obj[key]]) as Arr.Array<
    readonly [keyof Input, Input[keyof Input]]
  >) as (
    Obj.OwnEntries<Input>
  )
}
export { objOwnEntries as ownEntries }

// prettier-ignore
const objEntries = <
  Input extends Obj.UnknownObject
>(
  obj: Input,
): (
  Obj.Entries<Input>
) => {
  // type-coverage:ignore-next-line
  return (Object.entries(obj) as Arr.Array<
    readonly [keyof Input, Input[keyof Input]]
  >) as (
    Obj.Entries<Input>
  )
}
export { objEntries as entries }

export const fromEntries = <
  Entries extends Arr.Array<readonly [PropertyKey, unknown]>
>(
  entries: Entries,
): Obj.FromEntries<Entries> => {
  // type-coverage:ignore-next-line
  return Object.fromEntries(entries) as Obj.FromEntries<Entries>
}

const objSize = (obj: Obj.UnknownObject): Integer.NonNegativeInteger => {
  return Arr.size(objKeys(obj))
}
export { objSize as size }

export const isEmpty = <Input extends Obj.UnknownObject>(
  obj: Input,
): obj is Util.IsEqual<Partial<Input>, Input> extends true
  ? Obj.EmptyObject
  : keyof Input extends PropertyKey
  ? PropertyKey extends keyof Input
    ? Obj.EmptyObject
    : never
  : never => {
  return objSize(obj) === ZERO
}

export const isNonEmpty = <Input extends Obj.UnknownObject>(
  obj: Input,
): obj is Input => {
  return !isEmpty(obj)
}

export const has = <Key extends keyof Input, Input extends Obj.UnknownObject>(
  key: Key,
  obj: Input,
): obj is Input extends { readonly [K in Key]: Input[K] }
  ? { readonly [K in keyof Input]: Input[K] }
  : { readonly [K in keyof Input]: Input[K] } &
      { readonly [K in Key]: Input[K] } => {
  return hasOwnProperty.call(obj, key)
}

function objProp<Input extends Obj.UnknownObject, Key extends keyof Input>(
  key: Key,
): (obj: Input) => Input[Key]
function objProp<Input extends Obj.UnknownObject, Key extends keyof Input>(
  key: Key,
  obj: Input,
): Input[Key]
function objProp<Input extends Obj.UnknownObject, Key extends keyof Input>(
  ...args: readonly [key: Key, obj: Input] | readonly [key: Key]
): ((obj: Input) => Input[Key]) | Input[Key] {
  const key = args[0]

  const getResult = (o: Input): Input[Key] => o[key]

  return args.length === 1 ? getResult : getResult(args[1])
}
export { objProp as prop }

export const assoc = <
  Input extends Obj.UnknownObject,
  Key extends PropertyKey,
  OtherValue
>(
  key: Key,
  value: OtherValue,
  obj: Input,
): Obj.Merge<{ [K in Key]: OtherValue }, Input> => {
  return merge(
    // type-coverage:ignore-next-line
    { [key]: value } as { [K in Key]: OtherValue },
    obj,
  )
}

export const adjust = <
  Input extends Obj.UnknownObject,
  Key extends keyof Input,
  OtherValue
>(
  fn: (value: Input[Key]) => OtherValue,
  key: Key,
  obj: Input,
): Obj.Merge<{ [K in Key]: OtherValue }, Input> => {
  return merge(
    // type-coverage:ignore-next-line
    { [key]: fn(obj[key]) } as { [K in Key]: OtherValue },
    obj,
  )
}

export const dissoc = <
  Input extends Obj.UnknownObject,
  Key extends keyof Input
>(
  key: Key,
  obj: Input,
): Obj.Omit<Input, Key> => {
  return omit([key], obj)
}

export const pick = <Input extends Obj.UnknownObject, Key extends keyof Input>(
  keys: Arr.Array<Key>,
  obj: Input,
): Obj.Pick<Input, Key> => {
  return Arr.reduce<
    Obj.OwnEntries<Input>[number],
    Obj.Optional<Obj.Pick<Input, Key>>,
    Obj.Pick<Input, Key>
  >(
    (acc, [key, value]) => {
      return Arr.contains(key, normalizeKeys(keys))
        ? // type-coverage:ignore-next-line
          (merge({ [key]: value }, acc) as Obj.Optional<Obj.Pick<Input, Key>>)
        : acc
    },
    {},
    objOwnEntries(obj),
  )
}

export const omit = <Input extends Obj.UnknownObject, Key extends keyof Input>(
  keys: Arr.Array<Key>,
  obj: Input,
): Obj.Omit<Input, Key> => {
  return Arr.reduce<
    Obj.OwnEntries<Input>[number],
    Obj.Optional<Obj.Omit<Input, Key>>,
    Obj.Omit<Input, Key>
  >(
    (acc, [key, value]) => {
      return Arr.contains(key, normalizeKeys(keys))
        ? acc
        : // type-coverage:ignore-next-line
          (merge({ [key]: value }, acc) as Obj.Optional<Obj.Omit<Input, Key>>)
    },
    {},
    objOwnEntries(obj),
  )
}

export const merge = <
  SourceInput extends Obj.UnknownObject,
  DestInput extends Obj.UnknownObject
>(
  srcObj: SourceInput,
  destObj: DestInput,
): Obj.Merge<SourceInput, DestInput> => {
  // type-coverage:ignore-next-line
  return {
    ...(destObj as Obj.UnknownObject),
    ...(srcObj as Obj.UnknownObject),
  } as Obj.Merge<SourceInput, DestInput>
}

export const shallowEquals = <
  Input1 extends Obj.UnknownObject,
  Input2 extends Obj.Exact<Input1, Input2>
>(
  obj1: Input1,
  obj2: Input2,
): obj1 is Input2 => {
  if (Object.is(obj1, obj2)) return true

  const obj1Keys = objKeys(obj1)
  const obj2Keys = objKeys(obj2)

  if (Arr.size(obj1Keys) !== Arr.size(obj2Keys)) return false

  return Arr.every(
    (obj1Key) => Object.is(obj1[obj1Key], obj2[obj1Key]),
    obj1Keys,
  )
}

export const shallowCopy = <Input extends Obj.UnknownObject>(
  obj: Input,
): Input => {
  return { ...obj }
}
