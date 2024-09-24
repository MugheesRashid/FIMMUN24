var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
require('dotenv').config();
const cors = require("cors")
const favicon = require('serve-favicon'); // Import favicon middleware

const corsConfig = {
  origin: "*",
  credentials: true, // Fix the typo
  methods: ["GET", "POST", "PUT", "DELETE", ]
}
var indexRouter = require('./routes/index');
var adminModel = require("./models/admin")
const passport = require('passport');

var app = express();
app.options( "",cors(corsConfig))
app.use(cors(corsConfig))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialize: false,
  secret: "LOLOLO"
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'public', 'logo.png')));

// Pass the functions directly, without invoking them
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await adminModel.findById(id); // No more callbacks, using async/await
    done(null, user);  // Pass the user to the 'done' callback
  } catch (err) {
    done(err);  // Handle any errors
  }
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack); // Log the error stack trace
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error'); // Ensure you have an 'error.ejs' template
});

module.exports = app;
