const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const logger = require('./logger');
const routes = require('./routes');


const app = express();
const publicDir = path.join(__dirname, 'public');

app.disable('x-powered-by')
  .enable('verbose errors')
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .set('etag', 'strong')
  .set('json spaces', 2)
  .engine('html', ejs.renderFile)

  .use(favicon(path.join(publicDir, 'assets', 'img', 'favicon.ico')))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.json({ type: 'application/vnd.api+json' }))
  .use(cookieParser())
  .use(methodOverride('X-HTTP-Override'))
  .use(express.static(publicDir))
  .use(morgan('combined', { steam: logger.stream }))

  .use('/', routes)

  .use((req, res, next) => {
    const err = new Error('Not Found');

    err.status = 404;
    err.url = req.originalUrl;

    next(err);
  })
  .use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500).json({
      message: err.message,
      url: req.originalUrl,
      error: err,
    });
  });

module.exports = app;
