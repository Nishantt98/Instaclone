var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({    // (is code ki help se user Logging rahoge. matlab ki user ne ek bar logging kr liya to voh jb tak logout nhi 
  resave: false,            //hoga jb logout nhi karenge jiski help se voh difference pagies pa ja skte hai bina logout kare .or ya data 
  saveUninitialized: false, // server par save rakha hai. )
  secret: "heyheyehhdd"
}));

app.use(passport.initialize());    // passport ek aise method h jo user ko login krke rakha hai
app.use(passport.session()); //is code of line se hum data ko save kr pate hai
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(function(req, res, next) {    // catch 404 and forward to error handler
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
