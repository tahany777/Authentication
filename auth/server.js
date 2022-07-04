'use strict';

const basic = require('./middlewares/basicAuth.js');
const bearer = require('./middlewares/bearerAuth.js');
const signInHandler = require('./handler/signInHandler.js');
const signUpHandler = require('./handler/signUpHandler.js');
const userHandler = require('./handler/userHandler.js');
const Users = require('./models/user.model.js');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/signup', signUpHandler);
app.post('/signin',basic(Users), signInHandler);
app.get('/user', bearer(Users), userHandler);

module.exports = app;