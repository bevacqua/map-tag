# `map-tag`

🏷 Map template literal expression interpolations with ease.

# Install

```sh
npm install --save map-tag
```

# `mapTag(mapper, mapperContext?)`

Returns a function that can be used for tagging template literals.

The provided `mapper` is invoked with `Array`-method style arguments `(expression, i, expressions)` for each expression being interpolated into the template literal, where:

- `expression` is the current expression
- `i` is the position of `expression` in the list of `expressions`
- `expressions` is every expression

You can provide a `this` context for the `mapper` function via the `mapperContext` parameter, or use the default value of `null`.

The values returned from `mapper` will be used instead of the original expressions passed to the template literal.

# usage examples

```js
import mapTag from 'map-tag'

const uppercase = mapTag(expression =>
  String.prototype.toUpperCase.call(expression)
)

const name = 'jane'
const role = 'dentist'

uppercase`hello ${ name }, you're a great ${ role }!`
// <- 'hello JANE, you're a great DENTIST!'
```

```js
import mapTag from 'map-tag'

const encodeParams = mapTag(encodeURIComponent)

const collection = 'Log'
const query = '{}'
const fields = 'level'
const page = 2

encodeParams`/database/${ collection }/${ query }/${ fields }/${ page }`
// <- '/database/Log/%7B%7D/level/2'
```

# license

mit
