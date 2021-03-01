import test from 'ava'
import {
  I,
  NI,
  NPI,
  NNI,
  PI,
  MI,
  MNI,
  MNPI,
  MNNI,
  MPI,
  wrapIs,
  isType,
  i,
  ni,
  npi,
  nni,
  pi,
  mi,
  mni,
  mnpi,
  mnni,
  mpi,
} from '../test.js'
import { Nothing } from '../types/Integer.js'
import { MINIMUM, MAXIMUM } from './constants.js'
import { divide } from './divide.js'

test('divide()', (t) => {
  const is: ReturnType<typeof wrapIs> = wrapIs(t)

  is(mi(Math.trunc(ni() / ni())), isType<PI>()(divide(ni(), ni())))
  is(mi(Math.trunc(pi() / pi())), isType<PI>()(divide(pi(), pi())))
  is(mi(Math.trunc(i() / ni())), isType<I>()(divide(ni(), i())))
  is(mi(Math.trunc(i() / pi())), isType<I>()(divide(pi(), i())))
  is(mi(Math.trunc(npi() / ni())), isType<NNI>()(divide(ni(), npi())))
  is(mi(Math.trunc(nni() / ni())), isType<NPI>()(divide(ni(), nni())))
  is(mi(Math.trunc(pi() / ni())), isType<NI>()(divide(ni(), pi())))
  is(mi(Math.trunc(ni() / pi())), isType<NI>()(divide(pi(), ni())))
  is(mi(Math.trunc(npi() / pi())), isType<NPI>()(divide(pi(), npi())))
  is(mi(Math.trunc(nni() / pi())), isType<NNI>()(divide(pi(), nni())))

  is(Nothing, isType<MPI>()(divide(mni(), mni())))
  is(Nothing, isType<MPI>()(divide(mpi(), mpi())))
  is(Nothing, isType<MI>()(divide(mni(), mi())))
  is(Nothing, isType<MI>()(divide(mpi(), mi())))
  is(Nothing, isType<MNNI>()(divide(mni(), mnpi())))
  is(Nothing, isType<MNPI>()(divide(mni(), mnni())))
  is(Nothing, isType<MNI>()(divide(mni(), mpi())))
  is(Nothing, isType<MNI>()(divide(mpi(), mni())))
  is(Nothing, isType<MNPI>()(divide(mpi(), mnpi())))
  is(Nothing, isType<MNNI>()(divide(mpi(), mnni())))

  is(Nothing, isType<MPI>()(divide(mni(), ni())))
  is(Nothing, isType<MPI>()(divide(mpi(), pi())))
  is(Nothing, isType<MI>()(divide(mni(), i())))
  is(Nothing, isType<MI>()(divide(mpi(), i())))
  is(Nothing, isType<MNNI>()(divide(mni(), npi())))
  is(Nothing, isType<MNPI>()(divide(mni(), nni())))
  is(Nothing, isType<MNI>()(divide(mni(), pi())))
  is(Nothing, isType<MNI>()(divide(mpi(), ni())))
  is(Nothing, isType<MNPI>()(divide(mpi(), npi())))
  is(Nothing, isType<MNNI>()(divide(mpi(), nni())))

  is(Nothing, isType<MPI>()(divide(ni(), mni())))
  is(Nothing, isType<MPI>()(divide(pi(), mpi())))
  is(Nothing, isType<MI>()(divide(ni(), mi())))
  is(Nothing, isType<MI>()(divide(pi(), mi())))
  is(Nothing, isType<MNNI>()(divide(ni(), mnpi())))
  is(Nothing, isType<MNPI>()(divide(ni(), mnni())))
  is(Nothing, isType<MNI>()(divide(ni(), mpi())))
  is(Nothing, isType<MNI>()(divide(pi(), mni())))
  is(Nothing, isType<MNPI>()(divide(pi(), mnpi())))
  is(Nothing, isType<MNNI>()(divide(pi(), mnni())))

  is(Nothing, isType<Nothing>()(divide(Nothing, i())))
  is(Nothing, isType<Nothing>()(divide(Nothing, ni())))
  is(Nothing, isType<Nothing>()(divide(Nothing, npi())))
  is(Nothing, isType<Nothing>()(divide(Nothing, nni())))
  is(Nothing, isType<Nothing>()(divide(Nothing, pi())))

  is(Nothing, isType<Nothing>()(divide(Nothing, mi())))
  is(Nothing, isType<Nothing>()(divide(Nothing, mni())))
  is(Nothing, isType<Nothing>()(divide(Nothing, mnpi())))
  is(Nothing, isType<Nothing>()(divide(Nothing, mnni())))
  is(Nothing, isType<Nothing>()(divide(Nothing, mpi())))

  is(Nothing, isType<Nothing>()(divide(ni(), Nothing)))
  is(Nothing, isType<Nothing>()(divide(pi(), Nothing)))

  is(Nothing, isType<Nothing>()(divide(mni(), Nothing)))
  is(Nothing, isType<Nothing>()(divide(mpi(), Nothing)))

  is(Nothing, isType<Nothing>()(divide(Nothing, Nothing)))

  is(i(2), divide(pi(2), pi(4)))
  is(i(1), divide(pi(3), pi(4)))
  is(i(1), divide(pi(4), pi(4)))
  is(i(0), divide(pi(5), pi(4)))
  is(i(0), divide(pi(6), pi(4)))
  is(i(2), divide(pi(2), pi(5)))

  is(i(-2), divide(pi(2), ni(-4)))
  is(i(-1), divide(pi(3), ni(-4)))
  is(i(-1), divide(pi(4), ni(-4)))
  is(i(-0), divide(pi(5), ni(-4)))
  is(i(-0), divide(pi(6), ni(-4)))
  is(i(-2), divide(pi(2), ni(-5)))

  is(i(-2), divide(ni(-2), pi(4)))
  is(i(-1), divide(ni(-3), pi(4)))
  is(i(-1), divide(ni(-4), pi(4)))
  is(i(-0), divide(ni(-5), pi(4)))
  is(i(-0), divide(ni(-6), pi(4)))
  is(i(-2), divide(ni(-2), pi(5)))

  is(i(2), divide(ni(-2), ni(-4)))
  is(i(1), divide(ni(-3), ni(-4)))
  is(i(1), divide(ni(-4), ni(-4)))
  is(i(0), divide(ni(-5), ni(-4)))
  is(i(0), divide(ni(-6), ni(-4)))
  is(i(2), divide(ni(-2), ni(-5)))

  is(i(MINIMUM), divide(pi(1), ni(MINIMUM)))
  is(i(MAXIMUM), divide(pi(1), pi(MAXIMUM)))

  is(i(-3002399751580330), divide(pi(3), ni(MINIMUM)))
  is(i(3002399751580330), divide(pi(3), pi(MAXIMUM)))

  is(i(-0), divide(ni(MINIMUM), pi(1)))
  is(i(1), divide(ni(MINIMUM), ni(MINIMUM)))
  is(i(-1), divide(ni(MINIMUM), pi(MAXIMUM)))

  is(i(0), divide(pi(MAXIMUM), pi(1)))
  is(i(-1), divide(pi(MAXIMUM), ni(MINIMUM)))
  is(i(1), divide(pi(MAXIMUM), pi(MAXIMUM)))

  // @ts-expect-error
  divide(i(), i())
  // @ts-expect-error
  divide(npi(), npi())
  // @ts-expect-error
  divide(nni(), nni())
  // @ts-expect-error
  divide(i(), ni())
  // @ts-expect-error
  divide(i(), npi())
  // @ts-expect-error
  divide(npi(), i())
  // @ts-expect-error
  divide(i(), nni())
  // @ts-expect-error
  divide(nni(), i())
  // @ts-expect-error
  divide(i(), pi())
  // @ts-expect-error
  divide(npi(), ni())
  // @ts-expect-error
  divide(nni(), ni())
  // @ts-expect-error
  divide(npi(), nni())
  // @ts-expect-error
  divide(nni(), npi())
  // @ts-expect-error
  divide(npi(), pi())
  // @ts-expect-error
  divide(nni(), pi())
})
