const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const Router = require('./Router');
const Config = require('./config');
console.dir(Config);

const UTF_8 = 'utf-8';
const router = new Router();



http.createServer( (req, res) => {
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
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString)
        });

    });

})
    .listen(3000, () => console.log("The server is listening on port 3000."));
