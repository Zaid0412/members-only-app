const indexControllers = require('./controllers/indexControllers');
const express = require('express')
const path = require('node:path')
require('dotenv').config()
const app = express()

const PORT = process.env.PORT

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', indexControllers.home)

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`))