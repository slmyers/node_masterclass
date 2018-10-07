const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const Router = require('./Router');

const UTF_8 = 'utf-8';
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
    let buffer = '';
    req.on('data', data => buffer += decoder.write(data));
    req.on('end', () => {
        buffer += decoder.end();
        const data = {
            trimmedPath,
            query,
            method,
            headers: req.headers,
            payload: buffer
        };
        const handler = router.match(trimmedPath)
		handler(data, (statusCode=200, payload={}) => {
            const payloadString = JSON.stringify(payload);
            res.writeHead(statusCode);
            res.end(payloadString)
        });
    });
};