export interface Nothing {
  readonly Nothing: unique symbol
}
// type-coverage:ignore-next-line
export const Nothing = (undefined as unknown) as Nothing
