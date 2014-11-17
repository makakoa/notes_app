/*jshint node: true*/
'use strict';
var jwt = require('jwt-simple');
var User = require('../models/user');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.jwt || req.body.jwt;

    var decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch (err) {
      console.log(err);
      return res.status(403).send('access denied');
    }

    //time check (24 hours = 84600000)
    if ((Date.now() - decoded.timeStamp) > 84600000) {
      return res.status(403).send('session expired');
    }

    //admin check
    if (decoded.isAdmin) {
      req.isAdmin = true;
    } else {
      req.isAdmin = false;
    }

    User.findOne({_id: decoded.iss}, function(err, user) {
      if (err) return res.status(403).send('access denied');
      if (!user) return res.status(403).send('access denied');

      req.user = user;
      next();
    });
  };
};
