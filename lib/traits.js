(function(){
  'use strict';
  var T, Trait;
  T = require('traits').Trait;
  module.exports = Trait = (function(){
    Trait.displayName = 'Trait';
    var prototype = Trait.prototype, constructor = Trait;
    function Trait(){
      this._useTraits(true, this.traits());
    }
    prototype.useTraits = function(traits){
      return this._useTraits(false, traits);
    };
    prototype._useTraits = curry$(function(final, traits){
      var com, that, exc, p, t, ren, n, req, each, ovr, trt, valid, ref$;
      com = T.compose.apply(T, traits.compose);
      if (that = traits.exclude) {
        exc = T.compose.apply(T, (function(){
          var ref$, ref1$, results$ = [];
          for (p in ref$ = that) {
            t = ref$[p];
            results$.push(T.resolve((ref1$ = {}, ref1$[p + ""] = undefined, ref1$), t));
          }
          return results$;
        }()));
      }
      if (that = traits.rename) {
        ren = T.compose.apply(T, (function(){
          var ref$, ref1$, results$ = [];
          for (p in ref$ = that) {
            ref1$ = ref$[p], n = ref1$[0], t = ref1$[1];
            results$.push(T.resolve((ref1$ = {}, ref1$[p + ""] = n + "", ref1$), t));
          }
          return results$;
        }()));
      }
      if (that = traits.required) {
        req = T((function(){
          var i$, ref$, len$, results$ = {};
          for (i$ = 0, len$ = (ref$ = that).length; i$ < len$; ++i$) {
            each = ref$[i$];
            results$[each] = T.required;
          }
          return results$;
        }()));
      }
      ovr = T.override.apply(T, traits.override);
      if (that = traits.trait) {
        trt = T(that);
      }
      valid = T.compose.apply(T, [trt, com, exc, ren, req, ovr].filter(function(it){
        return it;
      }));
      if (final) {
        return import$(this, T.create((ref$ = traits.create) != null
          ? ref$
          : Object.prototype, valid));
      } else {
        return valid;
      }
    });
    prototype.traits = function(){
      return {
        compose: [],
        create: null,
        exclude: {},
        override: [],
        required: [],
        rename: {},
        trait: {}
      };
    };
    return Trait;
  }());
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
