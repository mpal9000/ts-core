import test from 'ava'
import {
  MI,
  MNPI,
  MNNI,
  wrapIs,
  isType,
  f,
  nf,
  npf,
  nnf,
  pf,
  mf,
  mnf,
  mnpf,
  mnnf,
  mpf,
  i,
} from '../test.js'
import { Nothing as NothingI } from '../types/Integer.js'
import { Nothing as NothingF } from '../types/Float.js'
import { EPSILON, SMALLEST, MINIMUM, MAXIMUM } from './constants.js'
import { trunc } from './trunc.js'

test('trunc()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(i(1), isType<MI>()(trunc(f(1.1))))
  is(i(-1), isType<MNPI>()(trunc(nf(-1.1))))
  is(i(-0), isType<MNPI>()(trunc(npf(-0.1))))
  is(i(0), isType<MNNI>()(trunc(nnf(0.1))))
  is(i(1), isType<MNNI>()(trunc(pf(1.1))))

  is(i(1), isType<MI>()(trunc(mf(1.1))))
  is(i(-1), isType<MNPI>()(trunc(mnf(-1.1))))
  is(i(-0), isType<MNPI>()(trunc(mnpf(-0.1))))
  is(i(0), isType<MNNI>()(trunc(mnnf(0.1))))
  is(i(1), isType<MNNI>()(trunc(mpf(1.1))))

  is(NothingI, isType<NothingI>()(trunc(NothingF)))

  is(i(-1262), trunc(f(-1262.48)))
  is(i(-65), trunc(f(-65.18)))
  is(i(-46), trunc(f(-46.5)))
  is(i(-42), trunc(f(-42)))
  is(i(-39), trunc(f(-39.425)))
  is(i(-18), trunc(f(-18.15)))
  is(i(-17), trunc(f(-17.1)))
  is(i(-17), trunc(f(-17)))
  is(i(-9), trunc(f(-9.13)))
  is(i(-5), trunc(f(-5.12)))
  is(i(-4), trunc(f(-4.6)))
  is(i(-4), trunc(f(-4.5)))
  is(i(-3), trunc(f(-3.9)))
  is(i(-3), trunc(f(-3.5)))
  is(i(-3), trunc(f(-3.1)))
  is(i(-3), trunc(f(-3)))
  is(i(-2), trunc(f(-2.9)))
  is(i(-2), trunc(f(-2.5)))
  is(i(-2), trunc(f(-2.26)))
  is(i(-2), trunc(f(-2.1755465135353)))
  is(i(-2), trunc(f(-2.175495134384)))
  is(i(-2), trunc(f(-2.1753543549)))
  is(i(-2), trunc(f(-2.1)))
  is(i(-2), trunc(f(-2)))
  is(i(-1), trunc(f(-1.9)))
  is(i(-1), trunc(f(-1.5)))
  is(i(-1), trunc(f(-1.4999999999999998)))
  is(i(-1), trunc(f(-1.45)))
  is(i(-1), trunc(f(-1.34)))
  is(i(-1), trunc(f(-1.123456789)))
  is(i(-1), trunc(f(-1.1)))
  is(i(-1), trunc(f(-1.015)))
  is(i(-1), trunc(f(-1.005)))
  is(i(-1), trunc(f(-1.0049999)))
  is(i(-1), trunc(f(-1)))
  is(i(-0), trunc(f(-0.9)))
  is(i(-0), trunc(f(-0.6)))
  is(i(-0), trunc(f(-0.5000000000000001)))
  is(i(-0), trunc(f(-0.5)))
  is(i(-0), trunc(f(-0.49999999999999994)))
  is(i(-0), trunc(f(-0.4)))
  is(i(-0), trunc(f(-0.2)))
  is(i(-0), trunc(f(-0.1)))
  is(i(-0), trunc(f(-0.014999999999999999)))
  is(i(-0), trunc(f(-0.01499999999999999)))
  is(i(-0), trunc(f(-0.0000001)))
  is(i(-0), trunc(f(-1e-8)))
  is(i(-0), trunc(f(-0)))
  is(i(0), trunc(f(0)))
  is(i(0), trunc(f(1e-8)))
  is(i(0), trunc(f(0.0000001)))
  is(i(0), trunc(f(0.01499999999999999)))
  is(i(0), trunc(f(0.014999999999999999)))
  is(i(0), trunc(f(0.1)))
  is(i(0), trunc(f(0.2)))
  is(i(0), trunc(f(0.4)))
  is(i(0), trunc(f(0.49999999999999994)))
  is(i(0), trunc(f(0.5)))
  is(i(0), trunc(f(0.5000000000000001)))
  is(i(0), trunc(f(0.6)))
  is(i(0), trunc(f(0.9)))
  is(i(1), trunc(f(1)))
  is(i(1), trunc(f(1.0049999)))
  is(i(1), trunc(f(1.005)))
  is(i(1), trunc(f(1.015)))
  is(i(1), trunc(f(1.1)))
  is(i(1), trunc(f(1.123456789)))
  is(i(1), trunc(f(1.34)))
  is(i(1), trunc(f(1.45)))
  is(i(1), trunc(f(1.4999999999999998)))
  is(i(1), trunc(f(1.5)))
  is(i(1), trunc(f(1.9)))
  is(i(2), trunc(f(2)))
  is(i(2), trunc(f(2.1)))
  is(i(2), trunc(f(2.1753543549)))
  is(i(2), trunc(f(2.175495134384)))
  is(i(2), trunc(f(2.1755465135353)))
  is(i(2), trunc(f(2.26)))
  is(i(2), trunc(f(2.5)))
  is(i(2), trunc(f(2.9)))
  is(i(3), trunc(f(3)))
  is(i(3), trunc(f(3.1)))
  is(i(3), trunc(f(3.5)))
  is(i(3), trunc(f(3.9)))
  is(i(4), trunc(f(4.5)))
  is(i(4), trunc(f(4.6)))
  is(i(5), trunc(f(5.12)))
  is(i(9), trunc(f(9.13)))
  is(i(17), trunc(f(17)))
  is(i(17), trunc(f(17.1)))
  is(i(18), trunc(f(18.15)))
  is(i(39), trunc(f(39.425)))
  is(i(42), trunc(f(42)))
  is(i(46), trunc(f(46.5)))
  is(i(65), trunc(f(65.18)))
  is(i(1262), trunc(f(1262.48)))

  is(i(0), trunc(f(EPSILON)))
  is(i(-0), trunc(f(EPSILON - 1)))
  is(i(1), trunc(f(EPSILON + 1)))

  is(i(0), trunc(f(SMALLEST)))
  is(i(-1), trunc(f(SMALLEST - 1)))
  is(i(1), trunc(f(SMALLEST + 1)))

  is(NothingI, trunc(f(MINIMUM)))
  is(NothingI, trunc(f(MAXIMUM)))
})
