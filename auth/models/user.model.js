'use strict';
require('dotenv').config();
const {sequelize, DataTypes} = require('./index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'some secret word';

const Users = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.VIRTUAL
    }
});
Users.authorizateBasic = async function (username, password) {
        try {
            const user = await this.findOne({where: {username: username}});
            const valid = await bcrypt.compare(password, user.password);
            if(valid) {
                //generate a new token
                let newToken = jwt.sign({username: user.username}, SECRET);
                user.token = newToken;
                return user;
            } else {
                console.log('The user is not valid');
                // return;
                throw new Error('Invalid Password');
            }
        } catch(error){
            console.log('error', error);
        }
}
Users.authorizateBearer = async function (token) {
        const verifyToken = jwt.verify(token, SECRET);
        console.log('verifyToken =>', verifyToken);
        const user = await this.findOne({where:{username: verifyToken.username}});
        if(user){
            return user;
        }
        throw new Error('invalid token');
}
module.exports = Users;






