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
//OR
// const Users = require('./models/user.model.js');
// const UserModel = Users(sequelize, DataTypes);


const PORT = process.env.PORT;



app.post('/signup', signUp);
app.post('/signin', signin);

//localhost:3000/signup >> body{username: 'tahany', password: '12345'}
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
//localhost:3000/signin >> Authorization >> 'Basic encoded(username:password)'
async function signin(req, res){
    if(req.headers['authorization']) {
       let basicHeaderParts = req.headers.authorization.split(' ');
       console.log('basicHeaderParts >>>', basicHeaderParts);
       let encodedPart = basicHeaderParts.pop(); //encoded(username:password)
       console.log('encodedPart >>>', encodedPart);
       let decoded = base64.decode(encodedPart);//username:password
       let [username, password] = decoded.split(':');
       
       try {
        const user = await Users.findOne({where: {username: username}});
        const valid = await bcrypt.compare(password, user.password);
        if(valid) {
            res.status(200).json({username:username})
        } else {
            res.send('The user is not valid')
        }
       } catch(error){
        res.send(error)
       }

    }
}

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server now is running ${PORT}`)
    })
}).catch(err=> console.log(err));