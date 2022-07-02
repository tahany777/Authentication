'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const app = express();

app.use(express.json());

const DATABASE_URL = process.env.DATABASE_URL;
const sequelize = new Sequelize(DATABASE_URL, {});

const basicAuth = require('./middlewares/basicAuth.js');
// const Users = require('./models/user.model')(sequelize, DataTypes);
//OR
const Users = require('./models/user.model.js');
const UserModel = Users(sequelize, DataTypes);


const PORT = process.env.PORT;

app.post('/signup', signUp);
// app.post('/signin', signin);
app.post('/signin',basicAuth(UserModel), signin);

//localhost:3000/signup >> body{username: 'tahany', password: '12345'}
async function signUp(req, res){
    console.log('anything');
    let {username, password} = req.body;
    console.log(`${username} and ${password}`);
    let hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await UserModel.create({
            username: username,
            password: hashedPassword
        })
    res.status(201).json(newUser)
}
//localhost:3000/signin >> Authorization >> 'Basic encoded(username:password)'
async function signin(req, res){
    res.status(200).json(req.user);
}

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server now is running ${PORT}`)
    })
}).catch(err=> console.log(err));