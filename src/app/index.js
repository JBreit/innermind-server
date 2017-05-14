import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import favicon from 'serve-favicon';
import path from 'path';
import morgan from 'morgan';
import methodOverride from 'method-override';
import { stream } from './logger';
import routes from './routes';


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
  .use(morgan('combined', { steam: stream }))

  .use('/', routes)

  .use((req, res, next) => {
    const err = new Error('Not Found');

    err.status = 404;
    err.url = req.originalUrl;

    next(err);
  })
  .use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res
      .status(err.status || 500)
      .json({
        message: err.message,
        url: req.originalUrl,
        error: err,
      });
  });

export default app;
