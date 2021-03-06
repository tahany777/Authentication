'use strict';
const base64 = require('base-64');

module.exports = (UserModel) => async (req, res, next) => {
    if(req.headers['authorization']) {
        let basicHeaderParts = req.headers.authorization.split(' ');
        console.log('basicHeaderParts >>>', basicHeaderParts);
        let encodedPart = basicHeaderParts.pop(); //encoded(username:password)
        console.log('encodedPart >>>', encodedPart);
        let decoded = base64.decode(encodedPart);//username:password
        let [username, password] = decoded.split(':');//[username: password]

        UserModel.authorizateBasic(username, password).then(validUser => {
            req.user = validUser;
            next();
        }).catch(error => next(`invalid user ${error}`))
    }
}