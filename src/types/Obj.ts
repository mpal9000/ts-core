import * as Util from './Util.js'
import * as Arr from './Arr.js'

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

export type EmptyObject = { readonly [Key in PropertyKey]: never }

export type UnknownObject = { readonly [Key in PropertyKey]: unknown }

export type UnknownMutableObject = { [Key in PropertyKey]: unknown }

export type Object<Input extends UnknownObject> = Immutable<Input>

type RequiredObject<Input extends UnknownObject> = {
  [Key in keyof Input]-?: Input[Key]
}
export { RequiredObject as Required }

export type Optional<Input extends UnknownObject> = {
  [Key in keyof Input]+?: Input[Key]
}

export type Immutable<Input extends UnknownMutableObject> = {
  +readonly [Key in keyof Input]: Input[Key]
}

export type Mutable<Input extends UnknownObject> = {
  -readonly [Key in keyof Input]: Input[Key]
}

type OmitStrict<Input extends UnknownObject, Key extends keyof Input> = Omit<
  Input,
  Key
>
export { OmitStrict as Omit }

export type PickStrict<
  Input extends UnknownObject,
  Key extends keyof Input
> = Pick<Input, Key>
export { PickStrict as Pick }

export type Exact<
  Expected extends UnknownObject,
  Actual extends Expected
> = Expected &
  { readonly [Key in Exclude<keyof Actual, keyof Expected>]: never }

type ObjectKey<Input extends UnknownObject> = keyof Input
export { ObjectKey as Key }

type ObjectValue<Input extends UnknownObject> = Input[keyof Input]
export { ObjectValue as Value }

type _ObjectEntry<
  Input extends UnknownObject,
  Key extends keyof Input
> = Key extends PropertyKey ? readonly [Key, Input[Key]] : never
type ObjectEntry<Input extends UnknownObject> = _ObjectEntry<Input, keyof Input>
export { ObjectEntry as Entry }

export type ToKey<Key extends PropertyKey> = Key extends string
  ? Key
  : Key extends number
  ? `${Key}`
  : never

export type ToOwnKey<Key extends PropertyKey> = Key extends string | symbol
  ? Key
  : Key extends number
  ? `${Key}`
  : never

type ObjectKeys<Input extends UnknownObject> = Arr.Array<ToKey<keyof Input>>
export { ObjectKeys as Keys }

type ObjectOwnKeys<Input extends UnknownObject> = Arr.Array<
  ToOwnKey<keyof Input>
>
export { ObjectOwnKeys as OwnKeys }

type ObjectValues<Input extends UnknownObject> = Arr.Array<
  Input[keyof Input extends symbol ? never : keyof Input]
>
export { ObjectValues as Values }

type ObjectOwnValues<Input extends UnknownObject> = Arr.Array<
  Input[keyof Input]
>
export { ObjectOwnValues as OwnValues }

type _ObjectOwnEntries<
  Input extends UnknownObject,
  Key extends keyof Input
> = Arr.Array<
  Key extends PropertyKey
    ? Input[Key] extends never
      ? never
      : readonly [ToOwnKey<Key>, Input[Key]]
    : never
>
type ObjectOwnEntries<Input extends UnknownObject> = _ObjectOwnEntries<
  Input,
  keyof Input
>
export { ObjectOwnEntries as OwnEntries }

type _ObjectEntries<
  Input extends UnknownObject,
  Key extends keyof Input
> = Arr.Array<
  Key extends string | number
    ? Input[Key] extends never
      ? never
      : readonly [ToKey<Key>, Input[Key]]
    : never
>
type ObjectEntries<Input extends UnknownObject> = _ObjectEntries<
  Input,
  keyof Input
>
export { ObjectEntries as Entries }

type FromEntry<Key extends PropertyKey, Value> = { readonly [K in Key]: Value }
type _FromEntry<Entry extends readonly [PropertyKey, unknown]> = Id<
  Util.UnionToIntersection<
    Entry extends readonly [infer Key, infer Value]
      ? Key extends PropertyKey
        ? FromEntry<Key, Value>
        : never
      : never
  >
>
export type FromEntries<
  Entries extends Arr.Array<readonly [PropertyKey, unknown]>
> = _FromEntry<Entries[number]>

export type HaveSameKeys<
  Input1 extends UnknownObject,
  Input2 extends UnknownObject
> = Util.IsEqual<keyof Input1, keyof Input2> extends true ? true : false

export type FilterKeysByType<
  Input extends UnknownObject,
  Type
> = Util.ExcludeUnsafe<
  { [Key in keyof Input]: Type extends Input[Key] ? Key : never }[keyof Input],
  undefined
>

export type FilterByType<Input extends UnknownObject, Type> = PickStrict<
  Input,
  FilterKeysByType<Input, Type>
>

export type OmitKeysByType<
  Input extends UnknownObject,
  Type
> = Util.ExcludeUnsafe<
  { [Key in keyof Input]: Type extends Input[Key] ? never : Key }[keyof Input],
  undefined
>

export type OmitByType<Input extends UnknownObject, Type> = PickStrict<
  Input,
  OmitKeysByType<Input, Type>
>

export type OmitKeysByEqualType<
  Input extends UnknownObject,
  Type
> = Util.ExcludeUnsafe<
  {
    [Key in keyof Input]: Util.IsEqual<Input[Key], Type> extends true
      ? never
      : Key
  }[keyof Input],
  undefined
>

export type OmitNever<Input extends UnknownObject> = PickStrict<
  Input,
  OmitKeysByEqualType<RequiredObject<Input>, never>
>

type Merged<Input extends UnknownObject> = { [Key in keyof Input]: Input[Key] }
export type Merge<
  SourceInput extends UnknownObject,
  DestInput extends UnknownObject
> = Merged<
  {
    [Key in keyof DestInput]: Key extends keyof SourceInput
      ? unknown
      : DestInput[Key]
  } &
    { [Key in keyof SourceInput]: SourceInput[Key] }
>
