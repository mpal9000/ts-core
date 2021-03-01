import * as Util from './types/Util.js'
import { EitherTag, Either, Left, Right } from './types/Either.js'
import * as Arr from './Arr.js'
import * as Maybe from './Maybe.js'

export * from './types/Either.js'

export function isEither<T extends Util.Mixed>(
  value: T,
): value is Extract<T, Either<unknown, unknown>>
export function isEither(value: unknown): value is Either<unknown, unknown>
export function isEither(value: unknown): boolean {
  return (
    Arr.isArray(value) &&
    Arr.size(value) === 2 &&
    Arr.some((v) => v === undefined, value)
  )
}

export const isLeft = <LT, RT>(either: Either<LT, RT>): either is Left<LT> => {
  return either[EitherTag] === 'Left'
}

export const isRight = <LT, RT>(
  either: Either<LT, RT>,
): either is Right<RT> => {
  return either[EitherTag] === 'Right'
}

export const left = <LT = never, RT = never>(leftValue: LT): Either<LT, RT> => {
  return { [EitherTag]: 'Left', left: leftValue }
}

export const right = <LT = never, RT = never>(
  rightValue: RT,
): Either<LT, RT> => {
  return { [EitherTag]: 'Right', right: rightValue }
}

export function fromMaybe<LT>(
  onNothing: () => LT,
): <RT>(maybe: Maybe.Maybe<RT>) => Either<LT, RT>
export function fromMaybe<LT, RT>(
  onNothing: () => LT,
  maybe: Maybe.Maybe<RT>,
): Either<LT, RT>
export function fromMaybe<LT, RT>(
  ...args: readonly [() => LT, Maybe.Maybe<RT>] | readonly [() => LT]
): ((maybe: Maybe.Maybe<RT>) => Either<LT, RT>) | Either<LT, RT> {
  const onNothing = args[0]

  const getResult = (maybe: Maybe.Maybe<RT>): Either<LT, RT> => {
    return Maybe.isNothing(maybe) ? left(onNothing()) : right(maybe)
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export const swap = <LT, RT>(either: Either<LT, RT>): Either<RT, LT> => {
  return isLeft(either) ? right(either.left) : left(either.right)
}

export function exists<RT>(
  predicate: (rightValue: RT) => boolean,
): <LT>(
  either: Either<LT, RT>,
) => typeof either extends Left<LT> ? false : ReturnType<typeof predicate>
export function exists<LT, RT>(
  predicate: (rightValue: RT) => boolean,
  either: Either<LT, RT>,
): typeof either extends Left<LT> ? false : ReturnType<typeof predicate>
export function exists<LT, RT>(
  ...args:
    | readonly [(rightValue: RT) => boolean, Either<LT, RT>]
    | readonly [(rightValue: RT) => boolean]
): ((either: Either<LT, RT>) => boolean) | boolean {
  const predicate = args[0]

  const getResult = (either: Either<LT, RT>): boolean => {
    return isLeft(either) ? false : predicate(either.right)
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export function alt<LT, RT>(
  getAlt: () => Either<LT, RT>,
): (either: Either<LT, RT>) => Either<LT, RT>
export function alt<LT, RT>(
  getAlt: () => Either<LT, RT>,
  either: Either<LT, RT>,
): Either<LT, RT>
export function alt<LT, RT>(
  ...args:
    | readonly [() => Either<LT, RT>, Either<LT, RT>]
    | readonly [() => Either<LT, RT>]
): ((either: Either<LT, RT>) => Either<LT, RT>) | Either<LT, RT> {
  const getAlt = args[0]

  const getResult = (either: Either<LT, RT>): Either<LT, RT> => {
    return isLeft(either) ? getAlt() : either
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export function getOrElse<LT, RT>(
  onLeft: (leftValue: LT) => RT,
): (either: Either<LT, RT>) => RT
export function getOrElse<LT, RT>(
  onLeft: (leftValue: LT) => RT,
  either: Either<LT, RT>,
): RT
export function getOrElse<LT, RT>(
  ...args:
    | readonly [(leftValue: LT) => RT, Either<LT, RT>]
    | readonly [(leftValue: LT) => RT]
): ((either: Either<LT, RT>) => RT) | RT {
  const onLeft = args[0]

  const getResult = (either: Either<LT, RT>): RT => {
    return isLeft(either) ? onLeft(either.left) : either.right
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export function orElse<LT1, LT2, RT>(
  onLeft: (leftValue: LT1) => Either<LT2, RT>,
): (either: Either<LT1, RT>) => Either<LT2, RT>
export function orElse<LT1, LT2, RT>(
  onLeft: (leftValue: LT1) => Either<LT2, RT>,
  either: Either<LT1, RT>,
): Either<LT2, RT>
export function orElse<LT1, LT2, RT>(
  ...args:
    | readonly [(leftValue: LT1) => Either<LT2, RT>, Either<LT1, RT>]
    | readonly [(leftValue: LT1) => Either<LT2, RT>]
): ((either: Either<LT1, RT>) => Either<LT2, RT>) | Either<LT2, RT> {
  const onLeft = args[0]

  const getResult = (either: Either<LT1, RT>): Either<LT2, RT> => {
    return isLeft(either) ? onLeft(either.left) : either
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export function chain<LT, RT1, RT2>(
  chainFn: (rightValue: RT1) => Either<LT, RT2>,
): (either: Either<LT, RT1>) => Either<LT, RT2>
export function chain<LT, RT1, RT2>(
  chainFn: (rightValue: RT1) => Either<LT, RT2>,
  either: Either<LT, RT1>,
): Either<LT, RT2>
export function chain<LT, RT1, RT2>(
  ...args:
    | readonly [(rightValue: RT1) => Either<LT, RT2>, Either<LT, RT1>]
    | readonly [(rightValue: RT1) => Either<LT, RT2>]
): ((either: Either<LT, RT1>) => Either<LT, RT2>) | Either<LT, RT2> {
  const chainFn = args[0]

  const getResult = (either: Either<LT, RT1>): Either<LT, RT2> => {
    return isLeft(either) ? either : chainFn(either.right)
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export function extend<LT, RT1, RT2>(
  extendFn: (either: Either<LT, RT1>) => RT2,
): (either: Either<LT, RT1>) => Either<LT, RT2>
export function extend<LT, RT1, RT2>(
  extendFn: (either: Either<LT, RT1>) => RT2,
  either: Either<LT, RT1>,
): Either<LT, RT2>
export function extend<LT, RT1, RT2>(
  ...args:
    | readonly [(either: Either<LT, RT1>) => RT2, Either<LT, RT1>]
    | readonly [(either: Either<LT, RT1>) => RT2]
): ((either: Either<LT, RT1>) => Either<LT, RT2>) | Either<LT, RT2> {
  const extendFn = args[0]

  const getResult = (either: Either<LT, RT1>): Either<LT, RT2> => {
    return isLeft(either) ? either : right(extendFn(either))
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export function map<RT1, RT2>(
  mapFn: (rightValue: RT1) => RT2,
): <LT>(either: Either<LT, RT1>) => Either<LT, RT2>
export function map<LT, RT1, RT2>(
  mapFn: (rightValue: RT1) => RT2,
  either: Either<LT, RT1>,
): Either<LT, RT2>
export function map<LT, RT1, RT2>(
  ...args:
    | readonly [(rightValue: RT1) => RT2, Either<LT, RT1>]
    | readonly [(rightValue: RT1) => RT2]
): ((either: Either<LT, RT1>) => Either<LT, RT2>) | Either<LT, RT2> {
  const mapFn = args[0]

  const getResult = (either: Either<LT, RT1>): Either<LT, RT2> => {
    return isLeft(either) ? either : right(mapFn(either.right))
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export function mapLeft<LT1, LT2>(
  mapFn: (leftValue: LT1) => LT2,
): <RT>(either: Either<LT1, RT>) => Either<LT2, RT>
export function mapLeft<LT1, LT2, RT>(
  mapFn: (leftValue: LT1) => LT2,
  either: Either<LT1, RT>,
): Either<LT2, RT>
export function mapLeft<LT1, LT2, RT>(
  ...args:
    | readonly [(leftValue: LT1) => LT2, Either<LT1, RT>]
    | readonly [(leftValue: LT1) => LT2]
): ((either: Either<LT1, RT>) => Either<LT2, RT>) | Either<LT2, RT> {
  const mapFn = args[0]

  const getResult = (either: Either<LT1, RT>): Either<LT2, RT> => {
    return isLeft(either) ? left(mapFn(either.left)) : either
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export function bimap<LT1, LT2, RT1, RT2>(
  mapLeftFn: (leftValue: LT1) => LT2,
  mapRightFn: (rightValue: RT1) => RT2,
): (either: Either<LT1, RT1>) => Either<LT2, RT2>
export function bimap<LT1, LT2, RT1, RT2>(
  mapLeftFn: (leftValue: LT1) => LT2,
  mapRightFn: (rightValue: RT1) => RT2,
  either: Either<LT1, RT1>,
): Either<LT2, RT2>
export function bimap<LT1, LT2, RT1, RT2>(
  ...args:
    | readonly [
        (leftValue: LT1) => LT2,
        (rightValue: RT1) => RT2,
        Either<LT1, RT1>,
      ]
    | readonly [(leftValue: LT1) => LT2, (rightValue: RT1) => RT2]
): ((either: Either<LT1, RT1>) => Either<LT2, RT2>) | Either<LT2, RT2> {
  const mapLeftFn = args[0]
  const mapRightFn = args[1]

  const getResult = (either: Either<LT1, RT1>): Either<LT2, RT2> => {
    return isLeft(either)
      ? left(mapLeftFn(either.left))
      : right(mapRightFn(either.right))
  }

  return args.length === 2 ? getResult : getResult(args[2])
}

export function ap<LT, RT1>(
  either1: Either<LT, RT1>,
): <RT2>(either2: Either<LT, (rightValue1: RT1) => RT2>) => Either<LT, RT2>
export function ap<LT, RT1, RT2>(
  either1: Either<LT, RT1>,
  either2: Either<LT, (rightValue1: RT1) => RT2>,
): Either<LT, RT2>
export function ap<LT, RT1, RT2>(
  ...args:
    | readonly [Either<LT, RT1>, Either<LT, (rightValue1: RT1) => RT2>]
    | readonly [Either<LT, RT1>]
):
  | ((either2: Either<LT, (rightValue1: RT1) => RT2>) => Either<LT, RT2>)
  | Either<LT, RT2> {
  const either1 = args[0]

  const getResult = (
    either2: Either<LT, (rightValue1: RT1) => RT2>,
  ): Either<LT, RT2> => {
    return isLeft(either2)
      ? either2
      : isLeft(either1)
      ? either1
      : right(either2.right(either1.right))
  }

  return args.length === 1 ? getResult : getResult(args[1])
}

export function fold<LT, RT, T>(
  onLeft: (leftValue: LT) => T,
  onRight: (rightValue: RT) => T,
): (either: Either<LT, RT>) => T
export function fold<LT, RT, T>(
  onLeft: (leftValue: LT) => T,
  onRight: (rightValue: RT) => T,
  either: Either<LT, RT>,
): T
export function fold<LT, RT, T>(
  ...args:
    | readonly [(leftValue: LT) => T, (rightValue: RT) => T, Either<LT, RT>]
    | readonly [(leftValue: LT) => T, (rightValue: RT) => T]
): ((either: Either<LT, RT>) => T) | T {
  const onLeft = args[0]
  const onRight = args[1]

  const getResult = (either: Either<LT, RT>): T => {
    return isLeft(either) ? onLeft(either.left) : onRight(either.right)
  }

  return args.length === 2 ? getResult : getResult(args[2])
}

export function reduce<RT, T>(
  initialValue: T,
  reduceFn: (initialValue: T, rightValue: RT) => T,
): <LT>(either: Either<LT, RT>) => T
export function reduce<LT, RT, T>(
  initialValue: T,
  reduceFn: (initialValue: T, rightValue: RT) => T,
  either: Either<LT, RT>,
): T
export function reduce<LT, RT, T>(
  ...args:
    | readonly [T, (initialValue: T, rightValue: RT) => T, Either<LT, RT>]
    | readonly [T, (initialValue: T, rightValue: RT) => T]
): ((either: Either<LT, RT>) => T) | T {
  const initialValue = args[0]
  const reduceFn = args[1]

  const getResult = (either: Either<LT, RT>): T => {
    return isLeft(either) ? initialValue : reduceFn(initialValue, either.right)
  }

  return args.length === 2 ? getResult : getResult(args[2])
}

export function reduceRight<RT, T>(
  initialValue: T,
  reduceFn: (rightValue: RT, initialValue: T) => T,
): <LT>(either: Either<LT, RT>) => T
export function reduceRight<LT, RT, T>(
  initialValue: T,
  reduceFn: (rightValue: RT, initialValue: T) => T,
  either: Either<LT, RT>,
): T
export function reduceRight<LT, RT, T>(
  ...args:
    | readonly [T, (rightValue: RT, initialValue: T) => T, Either<LT, RT>]
    | readonly [T, (rightValue: RT, initialValue: T) => T]
): ((either: Either<LT, RT>) => T) | T {
  const initialValue = args[0]
  const reduceFn = args[1]

  const getResult = (either: Either<LT, RT>): T => {
    return isLeft(either) ? initialValue : reduceFn(either.right, initialValue)
  }

  return args.length === 2 ? getResult : getResult(args[2])
}

export function tryCatch<RT>(
  runFn: () => RT,
): <LT>(onError: (caughtValue: unknown) => LT) => Either<LT, RT>
export function tryCatch<LT, RT>(
  runFn: () => RT,
  onError: (caughtValue: unknown) => LT,
): Either<LT, RT>
export function tryCatch<LT, RT>(
  ...args:
    | readonly [() => RT, (caughtValue: unknown) => LT]
    | readonly [() => RT]
):
  | ((onError: (caughtValue: unknown) => LT) => Either<LT, RT>)
  | Either<LT, RT> {
  const runFn = args[0]

  const getResult = (onError: (caughtValue: unknown) => LT): Either<LT, RT> => {
    try {
      return right(runFn())
    } catch (caughtValue: unknown) {
      return left(onError(caughtValue))
    }
  }

  return args.length === 1 ? getResult : getResult(args[1])
}
