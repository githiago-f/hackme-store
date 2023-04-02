import passport from 'passport';
import LocalStrategy from 'passport-local';
import { db } from "../db/connection.js";
import { rootLogger } from "../logging/root-logger.js";
import {getUser} from "../db/sql/auth.js";

const logger = rootLogger.child(
  { component: 'authentication' },
  true
);

/**
 * The strategy method cannot be async, so
 * work in it as callback based config:
 *
 * call the "next" function passing by the value
 * of any errors as first value, or the user as second value.
 *
 *  if there is an error: next(error, null);
 *  else: next(null, user);
 */
const options = {usernameField: 'email'};
passport.use('local', new LocalStrategy(options, (email, password, next) => {
    const query = db.raw(getUser({email, password}));
    query.then(([user]) => {
      logger.info(user);
      if(user.length<=0) {
        return next(null, false, { message: 'Username invalid!' });
      }
      logger.info('User found! ', user);

      return next(null, user);
    }).catch(e => next(e));
}));

/**
 * Will serialize (transform into a string)
 * the user object returned from te LocalStrategy.
 */
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    logger.info('Serializing user: ', user);
    cb(null, user);
  });
});

/**
 * Will deserialize (transform into an object)
 * the user returned from te cookie session.
 */
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    logger.info('Deserializing user: ', user);
    return cb(null, user);
  });
});
