const http = require('http');
const app = require('./app');
const logger = require('./app/logger');

const { HOST = '127.0.0.1', PORT = 8080 } = process.env;

http.createServer(app).listen(PORT, HOST, () => { logger.info(`Server running at http://${HOST}:${PORT}/\n`); });
