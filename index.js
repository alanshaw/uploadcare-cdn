function appendOp (url, op) {
  var parts = url.split('/')

  if (url[url.length - 1] == '/') {
    parts[parts.length - 1] = op
  } else {
    parts[parts.length - 1] = op + parts[parts.length - 1]
  }

  return parts.join('/')
}

var FormatValues = ['png', 'jpeg']

exports.format = function (url, type) {
  if (FormatValues.indexOf(type) == -1)
    throw new TypeError('Format must be one of ' + FormatValues)

  return appendOp(url, '-/format/' + encodeURIComponent(type) + '/')
}

var QualityValues = ['normal', 'better', 'best', 'lighter', 'lightest']

exports.quality = function (url, value) {
  if (QualityValues.indexOf(value) == -1)
    throw new TypeError('Quality must be one of ' + QualityValues)

  return appendOp(url, '-/quality/' + encodeURIComponent(value) + '/')
}

var ProgressiveValues = ['yes', 'no']

exports.progressive = function (url, value) {
  if (Object.prototype.toString.call(value) == '[object Boolean]') {
    value = value ? 'yes' : 'no'
  }

  if (ProgressiveValues.indexOf(value) == -1)
    throw new TypeError('Value must be one of ' + ProgressiveValues)

  return appendOp(url, '-/progressive/' + encodeURIComponent(value) + '/')
}

var PreviewRegex = /^[0-9]+x[0-9]+$/

exports.preview = function (url, dims) {
  if (!PreviewRegex.test(dims))
    throw new TypeError('Invalid dimensions format, expected format example: 200x200')

  return appendOp(url, '-/preview/' + encodeURIComponent(dims) + '/')
}

var ResizeRegex = /^([0-9]+x)|([0-9]+x[0-9]+)|(x[0-9]+)$/

exports.resize = function (url, dims) {
  if (!ResizeRegex.test(dims))
    throw new TypeError('Invalid dimensions format, expected format examples: 200x200, x200, 200x')

  return appendOp(url, '-/resize/' + encodeURIComponent(dims) + '/')
}

var CropDimsRegex = /^[0-9]+x[0-9]+$/
var CropCoordsRegex = /^([0-9]+,[0-9])|center+$/

exports.crop = function (url, dims, coords) {
  if (!CropDimsRegex.test(dims))
    throw new TypeError('Invalid dimensions format, expected format example: 200x200')

  if (coords) {
    if (!CropCoordsRegex.test(coords))
      throw new TypeError('Invalid coordinates format, expected format examples: 1400,1800, center')

    return appendOp(url, '-/crop/' + encodeURIComponent(dims) + '/' + encodeURIComponent(coords) + '/')
  }

  return appendOp(url, '-/crop/' + encodeURIComponent(dims) + '/')
}

var ScaleCropDimsRegex = /^[0-9]+x[0-9]+$/
var ScaleCropCoordsRegex = /^([0-9]+,[0-9])|center+$/

exports.scaleCrop = function (url, dims, coords) {
  if (!ScaleCropDimsRegex.test(dims))
    throw new TypeError('Invalid dimensions format, expected format example: 200x200')

  if (coords) {
    if (!ScaleCropCoordsRegex.test(coords))
      throw new TypeError('Invalid coordinates format, expected format examples: 1400,1800, center')

    return appendOp(url, '-/scale_crop/' + encodeURIComponent(dims) + '/' + encodeURIComponent(coords))
  }

  return appendOp(url, '-/scale_crop/' + encodeURIComponent(dims) + '/')
}

var StretchValues = ['on', 'off', 'fill']

exports.stretch = function (url, value) {
  if (StretchValues.indexOf(value) == -1)
    throw new TypeError('Stretch must be one of ' + StretchValues)

  return appendOp(url, '-/stretch/' + encodeURIComponent(value) + '/')
}

var SetFillRegex = /^[a-z0-9]$/

exports.setFill = function (url, color) {
  if (!SetFillRegex.test(color))
    throw new TypeError('Color must be in hexadecimal notation')

  return appendOp(url, '-/setfill/' + encodeURIComponent(color) + '/')
}

var AutoRotateValues = ['yes', 'no']

exports.autoRotate = function (url, value) {
  if (Object.prototype.toString.call(value) == '[object Boolean]') {
    value = value ? 'yes' : 'no'
  }

  if (AutoRotateValues.indexOf(value) == -1)
    throw new TypeError('Value must be one of ' + ProgressiveValues)

  return appendOp(url, '-/autorotate/' + encodeURIComponent(value) + '/')
}
