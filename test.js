var test = require('tape')
var UploadcareUrl = require('./')

test('resize with filename', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/foo.jpg'
  url = UploadcareUrl(url).resize('200x200').toString()
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/200x200/foo.jpg')
  t.end()
})

test('static resize with filename', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/foo.jpg'
  url = UploadcareUrl.resize(url, '200x200')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/200x200/foo.jpg')
  t.end()
})

test('resize without filename', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl(url).resize('200x200').toString()
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/200x200/')
  t.end()
})

test('static resize without filename', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.resize(url, '200x200')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/200x200/')
  t.end()
})

test('multiple transforms', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl(url).resize('138x').sharp(5).toString()
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/138x/-/sharp/5/')
  t.end()
})

test('static multiple transforms', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.resize(url, '138x')
  url = UploadcareUrl.sharp(url, 5)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/138x/-/sharp/5/')
  t.end()
})

test('validate format type', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.format(url, 'junk') })
  url = UploadcareUrl.format(url, 'jpeg')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/format/jpeg/')

  t.end()
})

test('validate quality type', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.quality(url, 'junk') })
  url = UploadcareUrl.quality(url, 'lighter')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/quality/lighter/')

  t.end()
})

test('validate progressive value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.progressive(url, 'junk') })
  url = UploadcareUrl.progressive(url, 'yes')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/progressive/yes/')

  t.end()
})

test('validate progressive value boolean', function (t) {
  t.plan(1)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.progressive(url, true)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/progressive/yes/')

  t.end()
})

test('validate preview dimensions', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.preview(url, '200x') })
  url = UploadcareUrl.preview(url, '138x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/preview/138x1138/')

  t.end()
})

test('validate resize dimensions', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.resize(url, 'junkxjunk') })
  url = UploadcareUrl.resize(url, '138x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/138x1138/')

  t.end()
})

test('validate resize dimensions single', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.resize(url, '138x')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/138x/')

  url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.resize(url, 'x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/x1138/')

  t.end()
})

test('validate crop dimensions', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.crop(url, '345x') })
  url = UploadcareUrl.crop(url, '138x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/crop/138x1138/')

  t.end()
})

test('validate crop coordinates', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.crop(url, '1x1', 'junk, 55') })
  url = UploadcareUrl.crop(url, '1x1', '911,999')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/crop/1x1/911%2C999/')

  t.end()
})

test('validate scale crop dimensions', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.scaleCrop(url, '345x') })
  url = UploadcareUrl.scaleCrop(url, '138x1138')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/scale_crop/138x1138/')

  t.end()
})

test('validate scale crop center', function (t) {
  t.plan(1)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.scaleCrop(url, '1x1', true)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/scale_crop/1x1/center/')

  t.end()
})

test('validate stretch value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.stretch(url, 'junk') })
  url = UploadcareUrl.stretch(url, 'on')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/stretch/on/')

  t.end()
})

test('validate set fill value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.setFill(url, 9349857) })
  url = UploadcareUrl.setFill(url, 'ffffff')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/setfill/ffffff/')

  t.end()
})

test('validate auto rotate value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.autoRotate(url, 'junk') })
  url = UploadcareUrl.autoRotate(url, 'yes')
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/autorotate/yes/')

  t.end()
})

test('validate auto rotate value boolean', function (t) {
  t.plan(1)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.autoRotate(url, true)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/autorotate/yes/')

  t.end()
})

test('validate sharp value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.sharp(url, 'junk') })
  url = UploadcareUrl.sharp(url, 7)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/sharp/7/')

  t.end()
})

test('validate sharp value range', function (t) {
  t.plan(3)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.sharp(url, -1) })
  t.throws(function () { UploadcareUrl.sharp(url, 21) })
  url = UploadcareUrl.sharp(url, 12)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/sharp/12/')

  t.end()
})

test('validate blur value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.blur(url, 'junk') })
  url = UploadcareUrl.blur(url, 23)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/blur/23/')

  t.end()
})

test('validate blur value range', function (t) {
  t.plan(3)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.blur(url, -1) })
  t.throws(function () { UploadcareUrl.blur(url, 5001) })
  url = UploadcareUrl.blur(url, 56)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/blur/56/')

  t.end()
})

test('validate rotate value', function (t) {
  t.plan(2)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.rotate(url, 'junk') })
  url = UploadcareUrl.rotate(url, 90)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/rotate/90/')

  t.end()
})

test('validate rotate value range', function (t) {
  t.plan(3)

  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  t.throws(function () { UploadcareUrl.rotate(url, 45) })

  url = UploadcareUrl.rotate(url, 270)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/rotate/270/')

  url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.rotate(url, 540)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/rotate/540/')

  t.end()
})

test('flip', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.flip(url)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/flip/')
  t.end()
})

test('mirror', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.mirror(url)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/mirror/')
  t.end()
})

test('greyscale', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.greyscale(url)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/greyscale/')
  t.end()
})

test('invert', function (t) {
  t.plan(1)
  var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/'
  url = UploadcareUrl.invert(url)
  t.equal(url, 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/invert/')
  t.end()
})
