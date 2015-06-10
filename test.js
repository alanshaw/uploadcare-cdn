var test = require('tape')
var uccdn = require('./')

test('resize with filename', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/foo.jpg'
  url = uccdn.resize(url, '200x200')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/200x200/foo.jpg')
  t.end()
})

test('resize without filename', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.resize(url, '200x200')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/200x200/')
  t.end()
})

test('multiple transforms', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.resize(url, '138x')
  url = uccdn.sharp(url, 5)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/138x/-/sharp/5/')
  t.end()
})

test('validate format type', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.format(url, 'junk') })
  url = uccdn.format(url, 'jpeg')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/format/jpeg/')

  t.end()
})

test('validate quality type', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.quality(url, 'junk') })
  url = uccdn.quality(url, 'lighter')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/quality/lighter/')

  t.end()
})

test('validate progressive value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.progressive(url, 'junk') })
  url = uccdn.progressive(url, 'yes')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/progressive/yes/')

  t.end()
})

test('validate progressive value boolean', function (t) {
  t.plan(1)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.progressive(url, true)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/progressive/yes/')

  t.end()
})

test('validate preview dimensions', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.preview(url, '200x') })
  url = uccdn.preview(url, '138x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/preview/138x1138/')

  t.end()
})

test('validate resize dimensions', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.resize(url, 'junkxjunk') })
  url = uccdn.resize(url, '138x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/138x1138/')

  t.end()
})

test('validate resize dimensions single', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.resize(url, '138x')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/138x/')

  url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.resize(url, 'x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/x1138/')

  t.end()
})

test('validate crop dimensions', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.crop(url, '345x') })
  url = uccdn.crop(url, '138x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/crop/138x1138/')

  t.end()
})

test('validate crop coordinates', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.crop(url, '1x1', 'junk, 55') })
  url = uccdn.crop(url, '1x1', '911,999')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/crop/1x1/911%2C999/')

  t.end()
})

test('validate scale crop dimensions', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.scaleCrop(url, '345x') })
  url = uccdn.scaleCrop(url, '138x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/scale_crop/138x1138/')

  t.end()
})

test('validate scale crop center', function (t) {
  t.plan(1)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.scaleCrop(url, '1x1', true)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/scale_crop/1x1/center/')

  t.end()
})

test('validate stretch value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.stretch(url, 'junk') })
  url = uccdn.stretch(url, 'on')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/stretch/on/')

  t.end()
})

test('validate set fill value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.setFill(url, 9349857) })
  url = uccdn.setFill(url, 'ffffff')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/setfill/ffffff/')

  t.end()
})

test('validate auto rotate value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.autoRotate(url, 'junk') })
  url = uccdn.autoRotate(url, 'yes')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/autorotate/yes/')

  t.end()
})

test('validate auto rotate value boolean', function (t) {
  t.plan(1)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.autoRotate(url, true)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/autorotate/yes/')

  t.end()
})

test('validate sharp value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.sharp(url, 'junk') })
  url = uccdn.sharp(url, 7)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/sharp/7/')

  t.end()
})

test('validate sharp value range', function (t) {
  t.plan(3)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.sharp(url, -1) })
  t.throws(function () { uccdn.sharp(url, 21) })
  url = uccdn.sharp(url, 12)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/sharp/12/')

  t.end()
})

test('validate blur value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.blur(url, 'junk') })
  url = uccdn.blur(url, 23)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/blur/23/')

  t.end()
})

test('validate blur value range', function (t) {
  t.plan(3)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.blur(url, -1) })
  t.throws(function () { uccdn.blur(url, 5001) })
  url = uccdn.blur(url, 56)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/blur/56/')

  t.end()
})

test('validate rotate value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.rotate(url, 'junk') })
  url = uccdn.rotate(url, 90)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/rotate/90/')

  t.end()
})

test('validate rotate value range', function (t) {
  t.plan(3)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { uccdn.rotate(url, 45) })

  url = uccdn.rotate(url, 270)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/rotate/270/')

  url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.rotate(url, 540)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/rotate/540/')

  t.end()
})

test('flip', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.flip(url)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/flip/')
  t.end()
})

test('mirror', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.mirror(url)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/mirror/')
  t.end()
})

test('greyscale', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.greyscale(url)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/greyscale/')
  t.end()
})

test('invert', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = uccdn.invert(url)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/invert/')
  t.end()
})
