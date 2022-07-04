'use strict';

//localhost:3000/signin >> Authorization >> 'Basic encoded(username:password)'
function signInHandler(req, res){
    res.status(200).json(req.user);
}

module.exports = signInHandler