import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as url from 'url';
import { rootLogger } from './infra/logging/root-logger.js';
import { createServer } from 'node:http';
import session from 'express-session';
import './infra/login/auth-providers.js';

import products from './routes/products.js';
import ordersWithError from "./routes/orders-with-error.js";
import orders from './routes/orders.js';
import auth from "./routes/auth.js";
import passport from "passport";

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

const sessionMiddleware = passport.authenticate('session');

// session and authentication
app.use(session({
  secret: 'sql_injection_project_vulnerable_secret', // this secret is also a vulnerability.
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));

app.get('/', (req, res) => res.redirect('/products'));
app.use('/auth', sessionMiddleware, auth);
app.use('/products', sessionMiddleware, products);
app.use('/orders', sessionMiddleware, orders);
app.use('/with-error/orders', sessionMiddleware, ordersWithError);

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

const server = createServer(app);
server.listen(8080, () => {
  let { address, family, port } = server.address();
  if(family === 'IPv6' && address === '::') {
    address = 'localhost';
  }
  app.set('address', address);
  rootLogger.info(`Listening on http://${address}:${port}`);
});

