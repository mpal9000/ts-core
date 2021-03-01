import test from 'ava'
import { wrapIs, isType, unknown, mixed } from '../test.js'
import { stringify } from './stringify.js'

test('stringify()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is('null', isType<string>()(stringify<null>(null)))
  is('"x"', isType<string>()(stringify<'x'>('x')))
  is(
    '{"a":["x","y","z"]}',
    isType<string>()(
      stringify<{ a: [string, string, string] }>({ a: ['x', 'y', 'z'] }),
    ),
  )

  is(
    '{\n  "a": [\n    "x",\n    "y",\n    "z"\n  ]\n}',
    isType<string>()(
      stringify<{ a: [string, string, string] }>(
        { indentation: 2 },
        { a: ['x', 'y', 'z'] },
      ),
    ),
  )

  // @ts-expect-error
  stringify(Date)
  // @ts-expect-error
  stringify(mixed())
  // @ts-expect-error
  stringify(unknown())
})
