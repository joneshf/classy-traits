(function(){
  'use strict';
  var T, Semigroup, Monoid, Functor, Apply, Applicative, Chain, Monad;
  T = require('traits').Trait;
  Semigroup = T({
    concat: T.required
  });
  Monoid = T.compose(Semigroup, T({
    empty: T.required
  }));
  Functor = T({
    map: T.required
  });
  Apply = T.compose(Functor, T({
    ap: T.required
  }));
  Applicative = T.compose(Apply, T({
    of: T.required,
    map: function(f){
      return this.of(f).ap(this);
    }
  }));
  Chain = T.compose(Apply, T({
    chain: T.required,
    ap: function(m){
      return this.chain(function(f){
        return m.map(f);
      });
    }
  }));
  Monad = T.compose(Chain, T.override(T({
    map: function(f){
      var m;
      m = this;
      return m.chain(function(x){
        return m.of(f(x));
      });
    }
  }), Applicative));
  module.exports = {
    Semigroup: Semigroup,
    Monoid: Monoid,
    Functor: Functor,
    Apply: Apply,
    Applicative: Applicative,
    Chain: Chain,
    Monad: Monad
  };
}).call(this);
