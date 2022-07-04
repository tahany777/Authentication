'use strict';
const bcrypt = require('bcrypt');
const Users = require('../models/user.model.js')
//localhost:3000/signup >> body{username: 'tahany', password: '12345'}
async function signUpHandler(req, res){
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

module.exports = signUpHandler