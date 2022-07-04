'use strict';
require('dotenv').config();
const {sequelize, DataTypes} = require('./models/index.js');
const app = require('./server.js')

const PORT = process.env.PORT;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server now is running ${PORT}`)
    })
}).catch(err=> console.log(err));