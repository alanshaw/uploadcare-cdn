# uploadcare-cdn

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
* `scaleCrop(<'url'>, <'200x200'>, ['1400,1800', 'center'])`
* `stretch(<'url'>, <'on','off','fill'>)`
* `setFill(<'url'>, <'ece3d2'>)`
* `autoRotate(<'url'>, <'yes','no'>)`