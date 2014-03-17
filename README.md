## Classy Traits

This is just a very thin wrapper around [traits][traits.js] for use with "class" altjs languages like coffeescript and livescript.
It provides an alternative to multiple inheritance and mixins that is less flawed.

### The problem

Any sufficiently large OOP project will run in to hierarchy issues.
Some languages solve this with multiple inheritance.
Some solve this with mixins.
Both approaches can get you into the diamond problem.

There is no good way to automatically handle conflicts once you're in a diamond.
Some attempts are:

* Arbitrarily decide which attribute/method to use globally.
This is the approach most languages take.
* Bloat the super class to have attributes/methods (that don't necessarily make sense in the superclass) from its subclasses.
* Produce more boiler plate by duplicating classes.

### A solution

Enter the concept of traits.

The original research and paper can be found [here][trait-site].
It is recommended to read at least [this paper][traits-intro-paper] in order to understand where multiple inheritance breaks down,
and where mixins also break down.

These are actual traits, not mixins as we have in LiveScript, Ruby, or Scala.
The main difference is that conflict resolution is forced upon the programmer, not the language.
With mixins or multiple inheritance, conflicts are resolved in a linear fashion.
Some use "first past the post" wins, some use "last past the post" wins,
some are even more compilcated.
With traits, the programmer must decide how to resolve the conflict.
If you have a conflict, and you do not resolve it, you cannot use the program.
In the case of classy-traits, you will get an runtime error upon instantiation.
This seems like more upfront work, and it is, but it allows for better composition and greater reusability.

For more documentation see [traits][traits].

### Usage

Inherit from Trait somewhere in your hierarchy.
It's easiest if you go to most super class of your classes,
and inherit from there. Then you need just one field in your class for the traits.

Example:
```livescript
require! T: traits.Trait
require! CT: \classy-traits .Traits

Foo = T do
  foo: T.required
  foo2: -> @foo! + 1

Bar = T do
  bar: T.required

class Baz extends CT
  traits: ->
    compose:
      Foo
      Bar
    trait:
      foo: -> @bar
      bar: 110

baz = new Baz
baz.foo2! #=> 111
```

There are a three ways to resolve conflicts:

* Renaming
* Excluding
* Overriding

You are encouraged to read the papers linked above to understand when to best use each.
If you're too lazy, hopefully the names are descriptive enough.
Of course, names in programming are all but meaningless, so code fast and loose at your own peril.

#### Options

###### compose

Compose other traits.
Must be an array of traits.

###### create

Prototype to create traits from.
Must be an actual prototype.

###### exclude

Attributes to exclude from specified traits.
Must be an object with the form:

```javascript
{
    <attribute_to_exclude1>: <trait_to_exclude_from1>,
    <attribute_to_exclude2>: <trait_to_exclude_from2>,
    ...
    <attribute_to_excluden>: <trait_to_exclude_fromn>
}
```

###### override

Traits to override.
This favors earlier traits.
Must be an array of traits.

###### required

Required attributes.
Must be an array of strings.

###### rename

Attributes to rename from specified traits.
Must be an object of the form:

```
{
    <attribute_to_rename1>: [<new_name1>, <trait_to_rename_from1>],
    <attribute_to_rename2>: [<new_name2>, <trait_to_rename_from2>],
    ...
    <attribute_to_renamen>: [<new_namen>, <trait_to_rename_fromn>]
}
```

###### trait

Object to create new trait.
Must be an object.


[traits]: http://soft.vub.ac.be/~tvcutsem/traitsjs/api.html
[traits.js]: https://www.npmjs.org/package/traits
[trait-site]: http://scg.unibe.ch/research/traits
[traits-intro-paper]: http://scg.unibe.ch/archive/papers/Scha02bTraits.pdf
