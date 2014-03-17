'use strict'

require! T: traits.Trait

Semigroup = T do
  concat: T.required

Monoid = T.compose do
  Semigroup
  T do
    empty: T.required

Functor = T do
  map: T.required

Apply = T.compose do
  Functor
  T do
    ap: T.required

Applicative = T.compose do
  Apply
  T do
    of: T.required
    map: (f) ->
      @of f .ap this

Chain = T.compose do
  Apply
  T do
    chain: T.required
    ap: (m) ->
      @chain (f) ->
        m.map f

Monad = T.compose do
  Chain
  T.override do
    T do
      map: (f) ->
        m = this
        m.chain (x) ->
          m.of f x
    Applicative

module.exports = do
  Semigroup: Semigroup
  Monoid: Monoid
  Functor: Functor
  Apply: Apply
  Applicative: Applicative
  Chain: Chain
  Monad: Monad
