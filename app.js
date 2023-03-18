import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as url from 'url';
import { rootLogger } from './infra/logging/root-logger.js';

import productsRouter from './routes/products.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, _) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  rootLogger.error(err);
});

const port = process.env.PORT ?? 8080;
app.set('port', port);

app.listen(port, () => rootLogger.info(`Listening on port http://localhost:${port}`));
