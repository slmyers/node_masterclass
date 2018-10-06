const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const UTF_8 = 'utf-8';
const Router = require('./Router');
const router = new Router({
    sample: function(data={}, cb){
        cb(406, {'name': 'sample handler', ...data})
    },
    notFound: function(data={}, cb){
        cb(404, {'name': 'supplied notFound', ...data})
    }
});

module.exports = (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const extraneousSlashes = /^\/+|\/+$/g;
  const trimmedPath = pathname.replace(extraneousSlashes,'');
  const method = req.method.toLowerCase();
  const decoder = new StringDecoder(UTF_8);
  // const log = `
  //     Request received on path: ${trimmedPath || "/"},
  //     with method: ${method},
  //     with queryParams: ${Object.keys(query)},
  //     with headers: ${JSON.stringify(req.headers, null, 2)}
  // `;

  let buffer = '';
  req.on('data', data => buffer += decoder.write(data));
  req.on('end', () => {
    buffer += decoder.end();

    const chosenHandler = router.match(trimmedPath);
    const data = {
      trimmedPath,
      query,
      method,
      headers: req.headers,
      payload: buffer
    };

    chosenHandler(data, (statusCode=200, payload={}) => {
      const payloadString = JSON.stringify(payload);
      res.writeHead(statusCode);
      res.end(payloadString)
    });

  });
};