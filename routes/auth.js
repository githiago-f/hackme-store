import {Router} from "express";
import { page } from '../lib/page-render.js';
import passport from "passport";

const router = Router();

router.get('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

router.get('/login', page('auth/login', { title: 'Sign In' }));

router.get('/register', page('auth/register', { title: 'Sign Up' }));

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default router;
