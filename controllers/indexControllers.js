const db = require('../db/queries');
const moment = require('moment');

const indexControllers = {
  home: async (req, res, next) => {
    try {
      db.getAllPosts().then((posts) => {
        if (posts.length > 0) {
          const formattedPosts = posts.map((post) => {
            return {
              ...post,
              formattedDate: moment(post.date).fromNow(),
            };
          });
          formattedPosts.reverse(); // Reverse the Array (Posts) to show the newest ones first
          res.render('index', {
            posts: formattedPosts,
            user: req.user || null,
          });
        }
        res.render('index', { posts: posts, user: req.user || null });
      });
    } catch (error) {
      next(error);
    }
  },

  members: async (req, res, next) => {
    try {
      const users = await db.getAllUsers(); // Wait for all users

      if (users.length > 0) {
        // Wait for all users' posts using Promise.all
        const formattedUsers = await Promise.all(
          users.map(async (user) => {
            const posts = await db.getPostsFromUserID(user.id); // Get posts for each user
            return {
              ...user,
              createdPosts: posts.length, // Store post count
            };
          })
        );

        console.log(formattedUsers); // Now properly resolved
        res.render('users', { user: req.user || null, users: formattedUsers });
      } else {
        res.render('users', { user: req.user || null, users: [] });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = indexControllers;
