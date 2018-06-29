module.exports = mapTag

function mapTag(mapper, mapperContext) {
  var fn = mapper === undefined ? identity : mapper
  var ctx = mapperContext === undefined ? null : mapperContext

  if (typeof fn !== 'function') {
    throw new TypeError('mapTag(mapper, mapperContext): mapper is not a function')
  }

  return tag

  function tag(template) {
    var expressions = Array.prototype.slice.call(arguments, 1)

    return template.reduce(templateReducer)

    function templateReducer(accumulator, part, i) {
      var j = i - 1
      var interpolation = fn.call(ctx, expressions[j], j, expressions)
      return accumulator + interpolation + part
    }
  }
}

function identity(expression) {
  return expression
}
