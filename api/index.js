const http = require('http');
const https = require('https');
const fs = require('fs');
const App = require('./App');
const httpsOpts = {
    key: fs.readFileSync("../certs/key.pem", "utf8"),
    cert: fs.readFileSync("../certs/server.crt", "utf8")
};

http.createServer(App).listen(3000, () => console.log("The http server is listening on port 3000."));
https.createServer(httpsOpts, App).listen(3001, () => console.log("The https server is listening on port 3001."));
