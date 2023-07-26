function handler(
  event: AWSCloudFrontFunction.Event,
): AWSCloudFrontFunction.Request {
  const request = event.request
  const uri = request.uri

  if (uri === '/') {
    // turns "/" to "/index.html"
    request.uri += 'index.html'
  } else if (uri.endsWith('/')) {
    // turns "/foo/" to "/foo.html"
    request.uri = uri.slice(0, -1) + '.html'
  } else if (!uri.includes('.')) {
    // turns "/foo" to "/foo.html"
    request.uri += '.html'
  }

  return request
}