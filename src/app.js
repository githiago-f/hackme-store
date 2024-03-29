import './infra/auth/auth-providers.js';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import logger from 'morgan';
import * as url from 'url';
import session from 'express-session';
import passport from "passport";

import { rootLogger } from './infra/logging/root-logger.js';
import products from './routes/products.js';
import orders from './routes/orders.js';
import auth from "./routes/auth.js";
import {page} from "./lib/page-render.js";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('common'));
app.use(express.json());
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

const sessionMiddleware = passport.authenticate('session');

// session and authentication
app.use(session({
  secret: 'sql_injection_project_vulnerable_secret', // this secret is also a vulnerability.
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false
  }
}));

app.get('/', page('index', { title: 'Home' }));
app.use('/auth', sessionMiddleware, auth);
app.use('/products', sessionMiddleware, products);
app.use('/orders', sessionMiddleware, orders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, _) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  rootLogger.error(err);
});

export const httpPort = process.env.PORT ?? 8080;
export const httpsPort = process.env.SECURE_PORT ?? 8443;
app.set('port', httpPort);
app.set('sport', httpsPort);

export default app;
