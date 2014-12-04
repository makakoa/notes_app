/*jshint node: true*/
var express = require('express');
var mongoose = require('mongoose');
var bp = require('body-parser');
var passport = require('passport');
var app = express();

app.use(express.static(__dirname + '/build'));

app.use(bp.json());
//app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');
//app.set('secret', process.env.SECRET || 'changethistoo');

mongoose.connect(process.env.MONGOLAB_URI ||
                 process.env.MONGOHQ_URL ||
                 'mongodb://localhost/notes_development');

//app.use(passport.initialize());

//require('./lib/passport')(passport);

//require('./routes/user_routes')(app, passport);
require('./routes/notes_routes')(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: ' + app.get('port'));
});
