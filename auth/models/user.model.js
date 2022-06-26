'use strict';
require('dotenv').config();
// const sequelize = require("sequelize");
const DATABASE_URL = process.env.DATABASE_URL;

const Users = (sequelize, DataTypes) => sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Users
