function appendOp (url, op) {
  var parts = url.split('/')

  if (url[url.length - 1] === '/') {
    parts[parts.length - 1] = op
  } else {
    parts[parts.length - 1] = op + parts[parts.length - 1]
  }

  return parts.join('/')
}

var FormatValues = ['png', 'jpeg']

exports.format = function (url, type) {
  if (FormatValues.indexOf(type) === -1) {
    throw new TypeError('Format must be one of ' + FormatValues)
  }

  return appendOp(url, '-/format/' + type + '/')
}

var QualityValues = ['normal', 'better', 'best', 'lighter', 'lightest']

exports.quality = function (url, value) {
  if (QualityValues.indexOf(value) === -1) {
    throw new TypeError('Quality must be one of ' + QualityValues)
  }

  return appendOp(url, '-/quality/' + value + '/')
}

var ProgressiveValues = ['yes', 'no']

exports.progressive = function (url, value) {
  if (Object.prototype.toString.call(value) === '[object Boolean]') {
    value = value ? 'yes' : 'no'
  }

  if (ProgressiveValues.indexOf(value) === -1) {
    throw new TypeError('Value must be one of ' + ProgressiveValues)
  }

  return appendOp(url, '-/progressive/' + value + '/')
}

var PreviewRegex = /^[0-9]+x[0-9]+$/

exports.preview = function (url, dims) {
  if (!PreviewRegex.test(dims)) {
    throw new TypeError('Invalid dimensions format, expected format example: 200x200')
  }

  return appendOp(url, '-/preview/' + dims + '/')
}

var ResizeRegex = /^([0-9]+x)|([0-9]+x[0-9]+)|(x[0-9]+)$/

exports.resize = function (url, dims) {
  if (!ResizeRegex.test(dims)) {
    throw new TypeError('Invalid dimensions format, expected format examples: 200x200, x200, 200x')
  }

  return appendOp(url, '-/resize/' + dims + '/')
}

var CropDimsRegex = /^[0-9]+x[0-9]+$/
var CropCoordsRegex = /^([0-9]+,[0-9])|center+$/

exports.crop = function (url, dims, coords) {
  if (!CropDimsRegex.test(dims)) {
    throw new TypeError('Invalid dimensions format, expected format example: 200x200')
  }

  if (coords) {
    if (!CropCoordsRegex.test(coords)) {
      throw new TypeError('Invalid coordinates format, expected format examples: 1400,1800, center')
    }

    return appendOp(url, '-/crop/' + dims + '/' + encodeURIComponent(coords) + '/')
  }

  return appendOp(url, '-/crop/' + dims + '/')
}

var ScaleCropDimsRegex = /^[0-9]+x[0-9]+$/
var ScaleCropCoordsRegex = /^([0-9]+,[0-9])|center+$/

exports.scaleCrop = function (url, dims, coords) {
  if (!ScaleCropDimsRegex.test(dims)) {
    throw new TypeError('Invalid dimensions format, expected format example: 200x200')
  }

  if (coords) {
    if (!ScaleCropCoordsRegex.test(coords)) {
      throw new TypeError('Invalid coordinates format, expected format examples: 1400,1800, center')
    }

    return appendOp(url, '-/scale_crop/' + dims + '/' + encodeURIComponent(coords) + '/')
  }

  return appendOp(url, '-/scale_crop/' + dims + '/')
}

var StretchValues = ['on', 'off', 'fill']

exports.stretch = function (url, value) {
  if (StretchValues.indexOf(value) === -1) {
    throw new TypeError('Stretch must be one of ' + StretchValues)
  }

  return appendOp(url, '-/stretch/' + value + '/')
}

var SetFillRegex = /^[a-f0-9]{6}$/

exports.setFill = function (url, color) {
  if (!SetFillRegex.test(color)) {
    throw new TypeError('Color must be in hexadecimal notation')
  }

  return appendOp(url, '-/setfill/' + color + '/')
}

var AutoRotateValues = ['yes', 'no']

exports.autoRotate = function (url, value) {
  if (Object.prototype.toString.call(value) === '[object Boolean]') {
    value = value ? 'yes' : 'no'
  }

  if (AutoRotateValues.indexOf(value) === -1) {
    throw new TypeError('Value must be one of ' + ProgressiveValues)
  }

  return appendOp(url, '-/autorotate/' + value + '/')
}

function isInt (value) {
  return (Object.prototype.toString.call(value) === '[object Number]' && parseFloat(value) === parseInt(value, 10)) && !isNaN(value)
}

exports.sharp = function (url, value) {
  if (value == null) {
    value = 5
  }

  if (Object.prototype.toString.call(value) === '[object String]') {
    value = parseInt(value, 10)
  }

  if (!isInt(value) || value < 0 || value > 20) {
    throw new TypeError('Sharpness must be an integer from 0 to 20')
  }

  return appendOp(url, '-/sharp/' + value + '/')
}

exports.blur = function (url, radius) {
  if (radius == null) {
    radius = 10
  }

  if (Object.prototype.toString.call(radius) === '[object String]') {
    radius = parseInt(radius, 10)
  }

  if (!isInt(radius) || radius < 0 || radius > 5000) {
    throw new TypeError('Blur radius must be an integer from 0 to 5000')
  }

  return appendOp(url, '-/blur/' + radius + '/')
}

exports.rotate = function (url, angle) {
  if (angle == null) {
    angle = 0
  }

  if (Object.prototype.toString.call(angle) === '[object String]') {
    angle = parseInt(angle, 10)
  }

  if (!isInt(angle) || angle % 90 !== 0) {
    throw new TypeError('Angle must be an integer and multiple of 90')
  }

  return appendOp(url, '-/rotate/' + angle + '/')
}

exports.flip = function (url) {
  return appendOp(url, '-/flip/')
}

exports.mirror = function (url) {
  return appendOp(url, '-/mirror/')
}

exports.greyscale = function (url) {
  return appendOp(url, '-/greyscale/')
}

exports.invert = function (url) {
  return appendOp(url, '-/invert/')
}
