exports.resize = function (url, dims) {
  var op = '-/resize/' + encodeURIComponent(dims) + '/'
  var parts = url.split('/')

  if (url[url.length - 1] == '/') {
    parts[parts.length - 1] = op
  } else {
    parts[parts.length - 1] = op + parts[parts.length - 1]
  }

  return parts.join('/')
}
