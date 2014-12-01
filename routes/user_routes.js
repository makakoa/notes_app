/*jshint node: true*/
'use strict';

var User = require('../models/user');

module.exports = function(app, passport, jwtauth) {
  app.get('/api/users', passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({jwt: req.user.generateToken(app.get('jwtSecret'))});
  });

  app.post('/api/users', function(req, res) {
    User.findOne({'basic.email': req.body.email}, function(err, user) {
      if (err) return res.status(500).send('server error');
      if (user) return res.status(500).send('cannot create that user');

      // email validation
      var at = req.body.email.indexOf('@');
      var dot = req.body.email.indexOf('.');
      if (at < 1 || dot < at + 2 || dot + 2 >= req.body.email.length) {
        return res.status(500).send('invalid email');
      }

      // password confirmation/validation
      if (!req.body.password) return res.status(500).send('please provide password');
      if (req.body.password.length < 6) {
        return res.status(500).send('invalid password');
      }

      var newUser = new User();
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);
      newUser.isAdmin = req.body.isAdmin;
      newUser.save(function(err, data) {
        if (err) return res.status(500).send('server error');
        res.json({jwt: newUser.generateToken(app.get('jwtSecret'))});
      });
    });
  });

  /*
  app.delete('/api/users/:id', jwtauth, function(req, res) {
    User.remove({_id:req.params.id}, function(err) {
      if (err) return res.status(500).send('error');
      res.json({msg: 'success!'});
    });
  });
  */
};
