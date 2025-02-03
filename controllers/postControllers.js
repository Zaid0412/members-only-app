const { validationResult } = require('express-validator');
const db = require('../db/queries');

const postsController = {
  create: {
    get: (req, res) => {
      res.render('create', { user: req.user || null, errors: null });
    },
    post: async (req, res, next) => {
      try {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
          res.render('create', {
            user: req.user || null,
            errors: errors.array(),
          });
        } else {
          db.createPost(req.body.title, req.body.content, req.user.id);
          res.redirect('/');
        }
      } catch (error) {
        next(error);
      }
    },
  },

  delete: async (req, res, next) => {
    try {
      await db.deletePost(req.params.id);
      console.log(req.params.id);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postsController;
