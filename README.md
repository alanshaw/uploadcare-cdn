# uploadcare-cdn

Perform image transformations on uploadcare URLs.

## Usage

### Resize

```js
var uccdn = require('uploadcare-cdn')
var url = 'http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/foo.jpg'
uccdn.resize(url, '200x200')
// http://www.ucarecdn.com/cca76eb6-1d25-4fee-a7a9-9516cc161b73/-/resize/200x200/foo.jpg
```