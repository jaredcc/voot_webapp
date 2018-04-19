var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require('firebase');
var firebaseui = require('firebaseui');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var representativesRouter = require('./routes/representatives');
var pollLocationRouter = require('./routes/locations');
var electionsRouter = require('./routes/elections');

var app = express();

//Initialize Firebase
var config = {
    apiKey: "AIzaSyAoT8tW_4Hh89ns4msbumBf9kDaa5CqCgI",
    authDomain: "vootapp-2a028.firebaseapp.com",
    databaseURL: "https://vootapp-2a028.firebaseio.com",
    projectId: "vootapp-2a028",
    storageBucket: "vootapp-2a028.appspot.com",
    messagingSenderId: "108880894642"
  };
  firebase.initializeApp(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/representatives', representativesRouter);
app.use('/locations', pollLocationRouter);
app.use('/elections', electionsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
