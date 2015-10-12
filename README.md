# uploadcare-cdn [![Build Status](https://travis-ci.org/alanshaw/uploadcare-cdn.svg)](https://travis-ci.org/alanshaw/uploadcare-cdn)

Perform image transformations on uploadcare URLs.

## Usage

### Example resize

```js
var uccdn = require('uploadcare-cdn')
var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/foo.jpg'

uccdn.resize(url, '200x200')
// http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/200x200/foo.jpg
```

### API

* `format(<'url'>, <'jpeg','png'>)`
* `quality(<'url'>, <'normal','better','best','lighter','lightest'>)`
* `progressive(<'url'>, <'yes','no'>)`
* `preview(<'url'>, <'200x200'>)`
* `resize(<'url'>, <'200x200','x200','200x'>)`
* `crop(<'url'>, <'200x200'>, ['1400,1800', 'center'])`
* `scaleCrop(<'url'>, <'200x200'>, ['center'])`
* `stretch(<'url'>, <'on','off','fill'>)`
* `setFill(<'url'>, <'ece3d2'>)`
* `autoRotate(<'url'>, <'yes','no'>)`
* `sharp(<'url'>, <0..20>)`
* `blur(<'url'>, <0..5000>)`
* `rotate(<'url'>, <90,180,270>)`
* `flip(<'url'>)`
* `mirror(<'url'>)`
* `greyscale(<'url'>)`
* `invert(<'url'>)`
* `nthImage(<'groupUrl'>, [<'index'>])`
* `gallery(<'groupUrl'>, [<'opts'>])`

### Gallery

The gallery method will transform a group URL into a gallery URL, which can be embedded as an iframe.
For a list of available options, see the [Uploadcare docs](https://uploadcare.com/documentation/cdn/#gallery).

See https://uploadcare.com/documentation/cdn/ for more info.
