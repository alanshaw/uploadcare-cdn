# uploadcare-cdn [![Build Status](https://travis-ci.org/alanshaw/uploadcare-cdn.svg)](https://travis-ci.org/alanshaw/uploadcare-cdn)

Perform image transformations on uploadcare URLs.

## Usage

### Example resize

```js
var UploadcareUrl = require('uploadcare-cdn')
var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/foo.jpg'

UploadcareUrl(url).resize('200x200').invert().toString()

// http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/200x200/-/invert/foo.jpg

// You can also call the API as static methods on the constructor e.g.
// NOTE: Pass the URL as the first param, returns a STRING
UploadcareUrl.resize(url, '200x200')
```

## API

* `format(<'jpeg','png'>)`
* `quality(<'normal','better','best','lighter','lightest'>)`
* `progressive(<'yes','no'>)`
* `preview(<'200x200'>)`
* `resize(<'200x200','x200','200x'>)`
* `crop(<'200x200'>, ['1400,1800', 'center'])`
* `scaleCrop(<'200x200'>, ['center'])`
* `stretch(<'on','off','fill'>)`
* `setFill(<'ece3d2'>)`
* `autoRotate(<'yes','no'>)`
* `sharp(<0..20>)`
* `blur(<0..5000>)`
* `rotate(<90,180,270>)`
* `flip()`
* `mirror()`
* `greyscale()`
* `invert()`
* `nthImage([<'index'>])`
* `gallery([<'opts'>])`

For any newer or unsupported operations you can call:

* `appendOp(<'-/op/args'>)`

### Gallery

The gallery method will transform a group URL into a gallery URL, which can be embedded as an iframe.
For a list of available options, see the [Uploadcare docs](https://uploadcare.com/documentation/cdn/#gallery).

See https://uploadcare.com/documentation/cdn/ for more info.


## Contribute

Feel free to dive in! [Open an issue](https://github.com/alanshaw/uploadcare-cdn/issues/new) or submit PRs.

## License

[ISC](LICENSE) © Alan Shaw
