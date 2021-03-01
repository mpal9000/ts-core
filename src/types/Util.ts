import * as Arr from './Arr.js'
import * as Obj from './Obj.js'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NonNullableValue = {}

export type Mixed = NonNullableValue | null | undefined

export type Assignable<Type1, Type2 extends Type1> = readonly [Type1, Type2]

type UnionExclude<Union, Type extends Union> = Exclude<Union, Type>
export { UnionExclude as Exclude }

export type ExcludeUnsafe<Union, Type> = Exclude<Union, Type>

type UnionExtract<Union, Type extends Union> = Extract<Union, Type>
export { UnionExtract as Extract }

export type ExtractUnsafe<Union, Type> = Extract<Union, Type>

type ImmutableArray<Arr extends Arr.UnknownArray> = {
  readonly [Key in keyof Arr]: ImmutableValue<Arr[Key]>
}
type ImmutableObject<Obj extends Obj.UnknownObject> = {
  readonly [Key in keyof Obj]: ImmutableValue<Obj[Key]>
}
type ImmutableValue<Value> = Value extends Arr.UnknownArray
  ? ImmutableArray<Value>
  : Value extends Obj.UnknownObject
  ? ImmutableObject<Value>
  : Value
export type Immutable<
  Value extends Obj.UnknownObject | Arr.UnknownArray
> = ImmutableValue<Value>

export type UnionToIntersection<Union> = (
  Union extends unknown ? (value: Union) => unknown : never
) extends (value: infer Type) => unknown
  ? Type
  : never

export type IsEqual<Type1, Type2> = (<Type>() => Type extends Type1
  ? 1
  : 2) extends <Type>() => Type extends Type2 ? 1 : 2
  ? true
  : false

export type IsAssignable<Type1, Type2> = Type2 extends Type1 ? true : false

export type IsNever<Type> = IsEqual<Type, never>
