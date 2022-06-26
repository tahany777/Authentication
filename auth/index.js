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

const Users = require('./models/user.model')(sequelize, DataTypes);


const PORT = process.env.PORT;


app.get('/', ()=> {
    console.log('server now is running11')
})
app.post('/signup', signUp);
async function signUp(req, res){
    console.log('anything');
    let {username, password} = req.body;
    console.log(`${username} and ${password}`);
    let hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await Users.create({
            username: username,
            password: hashedPassword
        })
    res.status(201).json(newUser)
}
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server now is running ${PORT}`)
    })
}).catch(err=> console.log(err));