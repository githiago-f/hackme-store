import {Router} from "express";
import { page } from '../lib/page-render.js';
import passport from "passport";
import {db} from "../infra/db/connection.js";
import {redirect} from "../lib/redirect.js";

const router = Router();

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/', redirect('/auth/login'))
router.get('/login', page('auth/login', { title: 'Sign In' }));

router.get('/register', page('auth/register', { title: 'Sign Up' }));

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  await db('users').insert({
    user_email: email,
    user_password: password
  }).returning('user_id');
  const params = new URLSearchParams({
    message: 'User ' + email + ' created successfully!'
  });
  res.redirect('/auth/login?' + params.toString());
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default router;
