'use strict';

function userHandler(req, res){
    //send user information to the client & do what the request required
    res.status(200).json(req.user);
}

module.exports = userHandler;