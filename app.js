const indexControllers = require('./controllers/indexControllers');
const userControllers = require('./controllers/userControllers');
const session = require('express-session')
const passport = require('passport')
const express = require('express')
const path = require('node:path')
const router = require('./routes/routes');
const { error } = require('node:console');
require('dotenv').config()
const app = express()

const PORT = process.env.PORT

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false, cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }}))
app.use(passport.session());

require("./config/passportConfig");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(router)

app.use((err, req, res, next) => {
    // next(createError(404));
    res.render('error', { message: err.message || null, user: req.user || null })
    console.log(err.message)
})

// app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`))