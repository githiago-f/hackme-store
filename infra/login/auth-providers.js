import passport from 'passport';
import LocalStrategy from 'passport-local';
import { db } from "../db/connection.js";
import { rootLogger } from "../logging/root-logger.js";

const logger = rootLogger.child();

/**
 * The strategy method cannot be async, so
 * work in it as callback based config:
 *
 * call the "next" function passing by the value
 * of the error as first value, or the user as second value.
 *
 *  if there is an error: next(error, null);
 *  else: next(null, user);
 */
passport.use('local', new LocalStrategy({usernameField: 'email'}, (email, password, next) => {
  const where = { user_email: email };
  const query = db.from('users').select().where(where).limit(1);
  query.then(([user]) => {
    if(!user) {
      next(null, false, { message: 'Username invalid!' })
    }
    logger.info('User found!');
    logger.info(user);

    if(user.user_password === password) {
      return next(null, user);
    }
    return next(null, false, { message: 'Password incorrect!'});
  }).catch(e => next(e));
}));

/**
 * This part of the code will serialize (transform into a string)
 * the user object returned from te LocalStrategy.
 */
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    logger.info('Serializing user: ', user);
    cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    logger.info('Deserializing user: ', user);
    return cb(null, user);
  });
});
