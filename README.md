## Classy Traits

This is just a thin wrapper around traits.js for use with "class" altjs languages like coffeescript and livescript.

For more documentation see traits.js.

### Usage

Inherit from Trait somewhere in your hierarchy.
It's easiest if you go to most super class of your classes,
and inherit from there.

Then you need just one field in your class for the traits.

Example:
```livescript
require! T: \classy-traits

class Foo extends T

  traits: ->
    trait:
      foo: 3

```

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
