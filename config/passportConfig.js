const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const db = require('../db/queries');
const bcrypt = require('bcryptjs');

async function verifyCallback(username, password, done) {
  try {
    const user = await db.getUserFromUname(username);
    if (!user) {
      return done(null, false, { message: 'Username Not Found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Incorrect Password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserFromId(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});
