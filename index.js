function identity(expression) {
  return expression
}

function mapTag(mapper, mapperContext) {
  var fn = mapper || identity 
  var ctx = mapperContext || null

  if (typeof fn !== 'function') {
    throw new TypeError('mapTag(mapper, mapperContext): mapper is not a function')
  }
  
  function tag(template) {
    function templateReducer(accumulator, part, i) {
      var j = i - 1
      var interpolation = fn.call(ctx, expressions[j], j, expressions)
      return accumulator + interpolation + part
    }
    
    var expressions = Array.prototype.slice.call(arguments, 1)

    return template.reduce(templateReducer)
  }

  return tag
}

module.exports = mapTag
