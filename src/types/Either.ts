export const EitherTag = Symbol('Either')

export type Left<LT> = {
  readonly [EitherTag]: 'Left'
  readonly left: LT
}

export type Right<RT> = {
  readonly [EitherTag]: 'Right'
  readonly right: RT
}

export type Either<LT, RT> = Left<LT> | Right<RT>

export type LeftOf<E extends Either<unknown, unknown>> = E extends Left<
  infer LT
>
  ? LT
  : never

export type RightOf<E extends Either<unknown, unknown>> = E extends Right<
  infer RT
>
  ? RT
  : never
