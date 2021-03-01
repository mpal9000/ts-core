import test from 'ava'
import { Nothing } from './Nothing.js'

test('Nothing', (t) => {
  {
    const f = (v: Nothing) => v

    f(Nothing)
    // @ts-expect-error
    f(undefined)
  }

  {
    const f = (v: undefined) => v

    f(undefined)
    // @ts-expect-error
    f(Nothing)
  }

  t.pass()
})
