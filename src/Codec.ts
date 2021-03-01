import { Refinement } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { chain, fold } from 'fp-ts/lib/Either'
import { failure as failureReporter } from 'io-ts/lib/PathReporter'
import * as t from 'io-ts'
import * as Float from './Float/index.js'
import * as Integer from './Integer/index.js'
import * as Arr from './Arr.js'
import * as Str from './Str.js'
import * as Obj from './Obj.js'
import * as Either from './Either.js'
import * as D8 from './D8.js'

export * from 'io-ts'

export { pipe, chain, fold }

const isZeroFloat = (value: unknown): value is Float.ZeroFloat => {
  return Float.isFloat(value) && value === 0
}

const isNegativeFloat = (value: unknown): value is Float.NegativeFloat => {
  return Float.isFloat(value) && Float.isNegative(value)
}

const isPositiveFloat = (value: unknown): value is Float.PositiveFloat => {
  return Float.isFloat(value) && Float.isPositive(value)
}

const isZeroInteger = (value: unknown): value is Integer.ZeroInteger => {
  return Integer.isInteger(value) && value === 0
}

const isNegativeInteger = (
  value: unknown,
): value is Integer.NegativeInteger => {
  return Integer.isInteger(value) && Integer.isNegative(value)
}

const isPositiveInteger = (
  value: unknown,
): value is Integer.PositiveInteger => {
  return Integer.isInteger(value) && Integer.isPositive(value)
}

export const rename = <Codec extends t.Any>(
  codec: Codec,
  name: string,
): t.Type<t.TypeOf<Codec>, t.OutputOf<Codec>, t.InputOf<Codec>> => {
  return new t.Type<t.TypeOf<Codec>, t.OutputOf<Codec>, t.InputOf<Codec>>(
    name,
    codec.is,
    codec.validate,
    codec.encode,
  )
}

export const literal = <Value extends string | number | boolean>(
  value: Value,
  name?: string,
): t.LiteralC<Value> => {
  return t.literal(value, name)
}

export const literalUnion = <Type extends string | number>(
  literalList: readonly Type[],
  name: string,
): t.KeyofC<{ readonly [Key in Type]?: null | undefined }> => {
  return t.keyof(
    literalList.reduce<{ readonly [Key in Type]?: null }>(
      (acc, item) => ({ ...acc, [item]: null }),
      {},
    ),
    name,
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const nullable = <Codec extends t.Any>(codec: Codec, name?: string) => {
  return new t.Type(
    name ?? `Nullable${codec.name}`,
    (value): value is t.TypeOf<Codec> | undefined => {
      return value === undefined || codec.is(value)
    },
    (input, context): t.Validation<t.TypeOf<Codec> | undefined> => {
      if (input === undefined) return t.failure(input, context)

      return pipe(
        t.union([t.null, codec]).validate(input, context),
        chain((validated) => {
          const decoded: t.TypeOf<Codec> | undefined =
            input === null ? undefined : validated

          return t.success(decoded)
        }),
      )
    },
    (
      value,
    ):
      | (t.TypeOf<Codec> extends undefined ? null : t.OutputOf<Codec>)
      | null => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value === undefined ? null : codec.encode(value)
    },
  )
}

export const NullableBoolean = nullable(t.boolean, 'NullableBoolean')

export const NullableNumber = nullable(t.number, 'NullableNumber')

export const NullableString = nullable(t.string, 'NullableString')

const NumberCodec = new t.Type<number, string, string>(
  'NumberCodec',
  t.number.is,
  (input: string, context: t.Context): t.Validation<number> => {
    const value = parseFloat(input)

    return isNaN(value) ? t.failure(input, context) : t.success(value)
  },
  (value: number) => value.toString(),
)
export const NumberFromString = t.string.pipe(NumberCodec, 'NumberFromString')

export function brand<
  Codec extends t.Any,
  Name extends string,
  Brand extends { readonly [Key in Name]: symbol }
>(
  codec: Codec,
  predicate: Refinement<t.TypeOf<Codec>, t.Branded<t.TypeOf<Codec>, Brand>>,
  name: Name,
): t.BrandC<Codec, Brand>
export function brand<Name extends string>(
  name: Name,
): <Brand extends { readonly [Key in Name]: symbol }>() => <
  Codec extends t.Any
>(
  codec: Codec,
) => t.BrandC<Codec, Brand>
export function brand<
  Codec extends t.Any,
  Name extends string,
  Brand extends { readonly [Key in Name]: symbol }
>(
  ...args:
    | readonly [name: Name]
    | readonly [
        codec: Codec,
        predicate: Refinement<
          t.TypeOf<Codec>,
          t.Branded<t.TypeOf<Codec>, Brand>
        >,
        name: Name,
      ]
):
  | t.BrandC<Codec, Brand>
  | (<_Brand extends { readonly [Key in Name]: symbol }>() => <
      _Codec extends t.Any
    >(
      codec: _Codec,
    ) => t.BrandC<_Codec, _Brand>) {
  if (args.length === 3) return t.brand(args[0], args[1], args[2])

  return <_Brand extends { readonly [Key in Name]: symbol }>() => <
    _Codec extends t.Any
  >(
    codec: _Codec,
  ): t.BrandC<_Codec, _Brand> => {
    return t.brand(
      codec,
      (_v): _v is t.Branded<t.TypeOf<_Codec>, _Brand> => true,
      args[0],
    )
  }
}

export const booleanBrand = <Name extends string>(name: Name) => <
  Brand extends { readonly [Key in Name]: symbol } = never
>(): t.BrandC<t.BooleanC, Brand> => {
  return brand(name)<Brand>()(t.boolean)
}

export const numberBrand = <Name extends string>(name: Name) => <
  Brand extends { readonly [Key in Name]: symbol } = never
>(): t.BrandC<t.NumberC, Brand> => {
  return brand(name)<Brand>()(t.number)
}

export const stringBrand = <Name extends string>(name: Name) => <
  Brand extends { readonly [Key in Name]: symbol } = never
>(): t.BrandC<t.StringC, Brand> => {
  return brand(name)<Brand>()(t.string)
}

export const uniqueBoolean = <Name extends string>(name: Name) => <
  Type extends boolean & { readonly [Key in Name]: symbol } = never
>() => <Is extends (value: unknown) => value is Type>(
  is: Is,
): t.Type<Type, Type, unknown> => {
  return new t.Type<Type, Type, unknown>(
    name,
    is,
    (input: unknown, context: t.Context): t.Validation<Type> => {
      return is(input) ? t.success(input) : t.failure(input, context)
    },
    (value: Type): Type => value,
  )
}

export const uniqueNumber = <Name extends string>(name: Name) => <
  Type extends number & { readonly [Key in Name]: symbol } = never
>() => <Is extends (value: unknown) => value is Type>(
  is: Is,
): t.Type<Type, Type, unknown> => {
  return new t.Type<Type, Type, unknown>(
    name,
    is,
    (input: unknown, context: t.Context): t.Validation<Type> => {
      return is(input) ? t.success(input) : t.failure(input, context)
    },
    (value: Type): Type => value,
  )
}

export const uniqueString = <Name extends string>(name: Name) => <
  Type extends string & { readonly [Key in Name]: symbol } = never
>() => <Is extends (value: unknown) => value is Type>(
  is: Is,
): t.Type<Type, Type, unknown> => {
  return new t.Type<Type, Type, unknown>(
    name,
    is,
    (input: unknown, context: t.Context): t.Validation<Type> => {
      return is(input) ? t.success(input) : t.failure(input, context)
    },
    (value: Type): Type => value,
  )
}

export const ZeroFloat = uniqueNumber('ZeroFloat')<Float.ZeroFloat>()(
  isZeroFloat,
)

export const NegativeFloat = uniqueNumber(
  'NegativeFloat',
)<Float.NegativeFloat>()(isNegativeFloat)

export const PositiveFloat = uniqueNumber(
  'PositiveFloat',
)<Float.PositiveFloat>()(isPositiveFloat)

export const NonPositiveFloat = t.union(
  [ZeroFloat, NegativeFloat],
  'NonPositiveFloat',
)

export const NonNegativeFloat = t.union(
  [ZeroFloat, PositiveFloat],
  'NonNegativeFloat',
)

const FloatCodec = t.union([NegativeFloat, ZeroFloat, PositiveFloat], 'Float')
export { FloatCodec as Float }

export const ZeroInteger = uniqueNumber('ZeroInteger')<Integer.ZeroInteger>()(
  isZeroInteger,
)

export const NegativeInteger = uniqueNumber(
  'NegativeInteger',
)<Integer.NegativeInteger>()(isNegativeInteger)

export const PositiveInteger = uniqueNumber(
  'PositiveInteger',
)<Integer.PositiveInteger>()(isPositiveInteger)

export const NonPositiveInteger = t.union(
  [ZeroInteger, NegativeInteger],
  'NonPositiveInteger',
)

export const NonNegativeInteger = t.union(
  [ZeroInteger, PositiveInteger],
  'NonNegativeInteger',
)

const IntegerCodec = t.union(
  [NegativeInteger, ZeroInteger, PositiveInteger],
  'Integer',
)
export { IntegerCodec as Integer }

export interface PercentageBrand {
  readonly Percentage: unique symbol
}
export const Percentage = brand(
  NonNegativeInteger,
  (
    value: t.TypeOf<typeof NonNegativeInteger>,
  ): value is t.Branded<
    t.TypeOf<typeof NonNegativeInteger>,
    PercentageBrand
  > => {
    return value <= 100
  },
  'Percentage',
)

export const DateIsoString: t.Type<D8.ValidDate, string, unknown> = new t.Type<
  D8.ValidDate,
  string,
  unknown
>(
  'DateIsoString',
  (value: unknown): value is D8.ValidDate => {
    return D8.isDate(value)
  },
  (input: unknown, context: t.Context): t.Validation<D8.ValidDate> => {
    return pipe(
      t.string.validate(input, context),
      chain(
        (value: string): t.Validation<D8.ValidDate> => {
          const maybeDate = D8.fromIsoString(value)

          return maybeDate === undefined
            ? t.failure(input, context)
            : t.success(maybeDate)
        },
      ),
    )
  },
  (value: D8.ValidDate): string => {
    return value.toISOString()
  },
)

type EmptyArray = readonly []

const isEmptyArray = (value: unknown): value is EmptyArray => {
  return Arr.isArray(value) && value.length === 0
}

export const EmptyArray = new t.Type<EmptyArray, EmptyArray, unknown>(
  'EmptyArray',
  isEmptyArray,
  (input: unknown, context: t.Context): t.Validation<EmptyArray> => {
    return isEmptyArray(input) ? t.success(input) : t.failure(input, context)
  },
  (_value: EmptyArray): EmptyArray => {
    return []
  },
)

type NonEmptyArray<Value> = readonly [Value, ...Value[]]

const isArrayNonEmpty = <Value>(
  value: readonly Value[],
): value is readonly [Value, ...Value[]] => {
  return value.length > 0
}

export const nonEmptyArray = <Codec extends t.Mixed>(
  codec: Codec,
  name: string,
): t.Type<
  NonEmptyArray<t.TypeOf<Codec>>,
  readonly t.OutputOf<Codec>[],
  unknown
> => {
  const ReadonlyArray = t.readonlyArray(codec)

  return new t.Type<
    NonEmptyArray<t.TypeOf<Codec>>,
    readonly t.OutputOf<Codec>[],
    unknown
  >(
    name,
    (value): value is NonEmptyArray<t.TypeOf<Codec>> => {
      return ReadonlyArray.is(value) && isArrayNonEmpty(value)
    },
    (input, context) => {
      return pipe(
        ReadonlyArray.validate(input, context),
        chain((value) => {
          return isArrayNonEmpty(value)
            ? t.success(value)
            : t.failure(input, context)
        }),
      )
    },
    (value: NonEmptyArray<t.TypeOf<Codec>>): readonly t.OutputOf<Codec>[] => {
      return ReadonlyArray.encode(value)
    },
  )
}

export const array = <Value extends t.Mixed>(
  value: Value,
  name: string,
): t.ReadonlyArrayC<Value> => {
  return t.readonlyArray(value, name)
}

export const record = <Props extends t.Props>(
  props: Props,
  name: string,
): t.ExactC<t.ReadonlyC<t.TypeC<Props>>> => {
  return t.exact(t.readonly(t.type(props)), name)
}

export const nonExactRecord = <Props extends t.Props>(
  props: Props,
  name: string,
): t.ReadonlyC<t.TypeC<Props>> => {
  return t.readonly(t.type(props), name)
}

export const partialRecord = <Props extends t.Props>(
  props: Props,
  name: string,
): t.ExactC<t.ReadonlyC<t.PartialC<Props>>> => {
  return t.exact(t.readonly(t.partial(props)), name)
}

export const nonExactPartialRecord = <Props extends t.Props>(
  props: Props,
  name: string,
): t.ReadonlyC<t.PartialC<Props>> => {
  return t.readonly(t.partial(props), name)
}

export const dictionary = <Key extends t.Mixed, Value extends t.Mixed>(
  key: Key,
  value: Value,
  name: string,
): t.ReadonlyC<t.RecordC<Key, Value>> => {
  return t.readonly(t.record(key, value), name)
}

type EnumTuple = readonly [
  readonly [number, string],
  readonly [number, string],
  ...(readonly [number, string])[]
]

type EnumTupleToRecord<Tuple extends EnumTuple> = {
  readonly [Key in Tuple[number][0]]: Extract<
    Tuple[number],
    readonly [Key, string]
  >[1]
}

export const tupleEnum = <Tuple extends EnumTuple>(
  tuple: Tuple,
  name: string,
): t.Type<
  Obj.Value<EnumTupleToRecord<Tuple>>,
  Obj.Key<EnumTupleToRecord<Tuple>> & Integer.Integer,
  unknown
> => {
  type RecordKey = Obj.Key<EnumTupleToRecord<Tuple>>
  type RecordValue = Obj.Value<EnumTupleToRecord<Tuple>>

  const rec: EnumTupleToRecord<Tuple> = tuple.reduce(
    (acc, value) => ({ ...acc, [value[0]]: value[1] }),
    {} as EnumTupleToRecord<Tuple>, // type-coverage:ignore-line
  )

  return new t.Type<RecordValue, RecordKey & Integer.Integer, unknown>(
    name,
    (value: unknown): value is RecordValue => {
      return Str.isString(value) && Arr.contains(value, Obj.values(rec))
    },
    (input: unknown, context: t.Context): t.Validation<RecordValue> => {
      return Integer.isInteger(input) && Obj.has(input, rec)
        ? t.success(rec[input as RecordKey])
        : t.failure(input, context)
    },
    (value): RecordKey & Integer.Integer => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const key = Obj.entries(rec).find((entry) => entry[1] === value)![0] // type-coverage:ignore-line

      return Integer.fromString(key) as Integer.Integer // type-coverage:ignore-line
    },
  )
}

export const error = (errors: t.Errors): Error => {
  return new Error(failureReporter(errors).join('\n\n'))
}

export const validate = <Value, EncodedValue>(
  codec: t.Type<Value, EncodedValue, unknown>,
  input: unknown,
): Either.Either<t.Errors, Value> => {
  return pipe(
    codec.validate(input, []),
    fold<t.Errors, Value, Either.Either<t.Errors, Value>>(
      (errors) => Either.left(errors),
      (value) => Either.right(value),
    ),
  )
}

export const decode = <Value, EncodedValue>(
  codec: t.Type<Value, EncodedValue, unknown>,
  input: unknown,
): Either.Either<t.Errors, Value> => {
  return pipe(
    codec.decode(input),
    fold<t.Errors, Value, Either.Either<t.Errors, Value>>(
      (errors) => Either.left(errors),
      (value) => Either.right(value),
    ),
  )
}

export const encode = <Value, EncodedValue>(
  codec: t.Type<Value, EncodedValue, unknown>,
  value: Value,
): EncodedValue => {
  return codec.encode(value)
}
