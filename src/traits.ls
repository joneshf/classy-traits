'use strict'

require! T: traits.Trait

module.exports = class Trait

  -> @_use-traits true @traits!

  use-traits: (traits) -> @_use-traits false traits

  _use-traits: (final, traits) -->

    # Create the composed Trait.
    com = T.compose ...traits.compose
    # Create the excludes Trait.
    exc = T.compose ...[T.resolve {"#p": undefined} t for p, t of that] if traits.exclude
    # Create the rename Trait.
    ren = T.compose ...[T.resolve {"#p": "#n"} t for p, [n, t] of that] if traits.rename
    # Create the required Trait.
    req = T {[each, T.required] for each in that} if traits.required
    # Create the override Trait.
    ovr = T.override ...traits.override
    # Create the normal Trait.
    trt = T that if traits.trait
    # Remove any undefined "traits".
    valid = T.compose ...[trt, com, exc, ren, req, ovr].filter -> it
    # If we've got all of our attributes resolved, we can create a new trait,
    # and shove it on the instance.
    if final
      this <<< T.create do
        traits.create ? Object::
        valid
    # Otherwise, just return the trait. A subclass will use it later.
    else
      valid

  traits: ->
    compose: []
    create: null
    exclude: {}
    override: []
    required: []
    rename: {}
    trait: {}
