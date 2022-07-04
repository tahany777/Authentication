'use strict';

module.exports = (UserModel) => async (req, res, next) => {
    if(req.headers['authorization']) {
        // 'Bearer token'
        let bearerHeaderParts = req.headers.authorization.split(' ');
        console.log('bearerHeaderParts >>>', bearerHeaderParts); // ['Bearer', 'token']
        let token = bearerHeaderParts.pop();
        console.log('Token >>>', token);
        UserModel.authorizateBearer(token).then(user => {
            req.user = user;
            next();
        }).catch(error => next(`invalid user ${error}`))
    }
}