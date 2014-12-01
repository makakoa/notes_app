/*jshint node: true*/
var express = require('express');
var mongoose = require('mongoose');
var bp = require('body-parser');
var passport = require('passport');
var app = express();

app.use(bp.json());
app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');

mongoose.connect(process.env.MONGOLAB_URI ||
                 process.env.MONGOHQ_URL ||
                 'mongodb://localhost/notes_development');

app.use(passport.initialize());

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

require('./routes/user_routes')(app, passport, jwtauth);
require('./routes/notes_routes')(app, jwtauth);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: ' + app.get('port'));
});
