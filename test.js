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
