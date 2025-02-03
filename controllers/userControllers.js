const LocalStrategy = require('passport-local').Strategy;
const { validationResult } = require('express-validator');
const passport = require('passport');
const db = require('../db/queries');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const usersControllers = {
  login: {
    get: (req, res) => {
      res.render('login', { user: req.user || null });
    },
    post: passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
    }),
  },

  register: {
    get: (req, res) => {
      res.render('register', { user: req.user || null, errors: null });
    },
    post: async (req, res, next) => {
      try {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
          res.render('register', {
            user: req.user || null,
            errors: errors.array(),
          });
          console.log(errors);
        } else {
          const { fullname, password, username } = req.body;
          const formattedUsername = username.replaceAll(' ', '');
          const hashedPassword = await bcrypt.hash(password, 10);

          db.createUser(fullname, formattedUsername, hashedPassword, '0', '0');
          res.redirect('/login');
        }
      } catch (error) {
        next(error);
      }
    },
  },

  join: {
    get: (req, res) => {
      return res.render('join', { user: req.user || null });
    },
    post: async (req, res, next) => {
      console.log(req.body.code);
      try {
        if (req.body.code == process.env.CODE) {
          db.giveUserMembership(req.user.id).then((e) => {
            return res.redirect('/');
          });
        } else {
          return res.redirect('/join');
        }
      } catch (error) {
        next(error);
      }
    },
  },

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
};

module.exports = usersControllers;
