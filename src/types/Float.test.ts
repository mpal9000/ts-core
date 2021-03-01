import test from 'ava'
import { n, f, nf, npf, nnf, pf } from '../test.js'
import {
  Nothing,
  Float,
  NegativeFloat,
  NonPositiveFloat,
  NonNegativeFloat,
  PositiveFloat,
} from './Float.js'

test('types()', (t) => {
  {
    {
      const fn = (v: number) => v

      fn(f())
      fn(nf())
      fn(npf())
      fn(nnf())
      fn(pf())
    }

    {
      const fn = (v: Float) => v

      // @ts-expect-error
      fn(n())
      fn(f())
      fn(nf())
      fn(npf())
      fn(nnf())
      fn(pf())
    }

    {
      const fn = (v: NegativeFloat) => v

      // @ts-expect-error
      fn(n())
      // @ts-expect-error
      fn(f())
      fn(nf())
      // @ts-expect-error
      fn(npf())
      // @ts-expect-error
      fn(nnf())
      // @ts-expect-error
      fn(pf())
    }

    {
      const fn = (v: NonPositiveFloat) => v

      // @ts-expect-error
      fn(n())
      // @ts-expect-error
      fn(f())
      fn(nf())
      fn(npf())
      // @ts-expect-error
      fn(nnf())
      // @ts-expect-error
      fn(pf())
    }

    {
      const fn = (v: NonNegativeFloat) => v

      // @ts-expect-error
      fn(n())
      // @ts-expect-error
      fn(f())
      // @ts-expect-error
      fn(nf())
      // @ts-expect-error
      fn(npf())
      fn(nnf())
      fn(pf())
    }

    {
      const fn = (v: PositiveFloat) => v

      // @ts-expect-error
      fn(n())
      // @ts-expect-error
      fn(f())
      // @ts-expect-error
      fn(nf())
      // @ts-expect-error
      fn(npf())
      // @ts-expect-error
      fn(nnf())
      fn(pf())
    }
  }

  {
    type X = 1 & Float

    // type-coverage:ignore-next-line
    const x = (): X => 1 as X

    {
      const fn = (v: 1) => v

      fn(1)
      // @ts-expect-error
      fn(f())
      fn(x())
    }

    {
      const fn = (v: Float) => v

      // @ts-expect-error
      fn(1)
      fn(f())
      fn(x())
    }

    {
      const fn = (v: X) => v

      // @ts-expect-error
      fn(1)
      // @ts-expect-error
      fn(f())
      fn(x())
    }
  }

  {
    {
      const fn = (v: Nothing) => v

      fn(Nothing)
      // @ts-expect-error
      fn(undefined)
    }

    {
      const fn = (v: undefined) => v

      fn(undefined)
      // @ts-expect-error
      fn(Nothing)
    }
  }

  t.pass()
})
