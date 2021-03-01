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
import { round } from './round.js'

test('round()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(i(1), isType<MI>()(round(f(1.1))))
  is(i(-1), isType<MNPI>()(round(nf(-1.1))))
  is(i(-0), isType<MNPI>()(round(npf(-0.1))))
  is(i(0), isType<MNNI>()(round(nnf(0.1))))
  is(i(1), isType<MNNI>()(round(pf(1.1))))

  is(i(1), isType<MI>()(round(mf(1.1))))
  is(i(-1), isType<MNPI>()(round(mnf(-1.1))))
  is(i(-0), isType<MNPI>()(round(mnpf(-0.1))))
  is(i(0), isType<MNNI>()(round(mnnf(0.1))))
  is(i(1), isType<MNNI>()(round(mpf(1.1))))

  is(NothingI, isType<NothingI>()(round(NothingF)))

  is(i(-1262), round(f(-1262.48)))
  is(i(-65), round(f(-65.18)))
  is(i(-47), round(f(-46.5)))
  is(i(-42), round(f(-42)))
  is(i(-39), round(f(-39.425)))
  is(i(-18), round(f(-18.15)))
  is(i(-17), round(f(-17.1)))
  is(i(-17), round(f(-17)))
  is(i(-9), round(f(-9.13)))
  is(i(-5), round(f(-5.12)))
  is(i(-5), round(f(-4.6)))
  is(i(-5), round(f(-4.5)))
  is(i(-4), round(f(-3.9)))
  is(i(-4), round(f(-3.5)))
  is(i(-3), round(f(-3.1)))
  is(i(-3), round(f(-3)))
  is(i(-3), round(f(-2.9)))
  is(i(-3), round(f(-2.5)))
  is(i(-2), round(f(-2.26)))
  is(i(-2), round(f(-2.1755465135353)))
  is(i(-2), round(f(-2.175495134384)))
  is(i(-2), round(f(-2.1753543549)))
  is(i(-2), round(f(-2.1)))
  is(i(-2), round(f(-2)))
  is(i(-2), round(f(-1.9)))
  is(i(-2), round(f(-1.5)))
  is(i(-1), round(f(-1.4999999999999998)))
  is(i(-1), round(f(-1.45)))
  is(i(-1), round(f(-1.34)))
  is(i(-1), round(f(-1.123456789)))
  is(i(-1), round(f(-1.1)))
  is(i(-1), round(f(-1.015)))
  is(i(-1), round(f(-1.005)))
  is(i(-1), round(f(-1.0049999)))
  is(i(-1), round(f(-1)))
  is(i(-1), round(f(-0.9)))
  is(i(-1), round(f(-0.6)))
  is(i(-1), round(f(-0.5000000000000001)))
  is(i(-1), round(f(-0.5)))
  is(i(-0), round(f(-0.49999999999999994)))
  is(i(-0), round(f(-0.4)))
  is(i(-0), round(f(-0.2)))
  is(i(-0), round(f(-0.1)))
  is(i(-0), round(f(-0.014999999999999999)))
  is(i(-0), round(f(-0.01499999999999999)))
  is(i(-0), round(f(-0.0000001)))
  is(i(-0), round(f(-1e-8)))
  is(i(-0), round(f(-0)))
  is(i(0), round(f(0)))
  is(i(0), round(f(1e-8)))
  is(i(0), round(f(0.0000001)))
  is(i(0), round(f(0.01499999999999999)))
  is(i(0), round(f(0.014999999999999999)))
  is(i(0), round(f(0.1)))
  is(i(0), round(f(0.2)))
  is(i(0), round(f(0.4)))
  is(i(0), round(f(0.49999999999999994)))
  is(i(1), round(f(0.5)))
  is(i(1), round(f(0.5000000000000001)))
  is(i(1), round(f(0.6)))
  is(i(1), round(f(0.9)))
  is(i(1), round(f(1)))
  is(i(1), round(f(1.0049999)))
  is(i(1), round(f(1.005)))
  is(i(1), round(f(1.015)))
  is(i(1), round(f(1.1)))
  is(i(1), round(f(1.123456789)))
  is(i(1), round(f(1.34)))
  is(i(1), round(f(1.45)))
  is(i(1), round(f(1.4999999999999998)))
  is(i(2), round(f(1.5)))
  is(i(2), round(f(1.9)))
  is(i(2), round(f(2)))
  is(i(2), round(f(2.1)))
  is(i(2), round(f(2.1753543549)))
  is(i(2), round(f(2.175495134384)))
  is(i(2), round(f(2.1755465135353)))
  is(i(2), round(f(2.26)))
  is(i(3), round(f(2.5)))
  is(i(3), round(f(2.9)))
  is(i(3), round(f(3)))
  is(i(3), round(f(3.1)))
  is(i(4), round(f(3.5)))
  is(i(4), round(f(3.9)))
  is(i(5), round(f(4.5)))
  is(i(5), round(f(4.6)))
  is(i(5), round(f(5.12)))
  is(i(9), round(f(9.13)))
  is(i(17), round(f(17)))
  is(i(17), round(f(17.1)))
  is(i(18), round(f(18.15)))
  is(i(39), round(f(39.425)))
  is(i(42), round(f(42)))
  is(i(47), round(f(46.5)))
  is(i(65), round(f(65.18)))
  is(i(1262), round(f(1262.48)))

  is(i(0), round(f(EPSILON)))
  is(i(-1), round(f(EPSILON - 1)))
  is(i(1), round(f(EPSILON + 1)))

  is(i(0), round(f(SMALLEST)))
  is(i(-1), round(f(SMALLEST - 1)))
  is(i(1), round(f(SMALLEST + 1)))

  is(NothingI, round(f(MINIMUM)))
  is(NothingI, round(f(MAXIMUM)))
})
