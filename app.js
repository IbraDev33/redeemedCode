var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const mongoose = require('mongoose')

require('dotenv').config()



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let adminRouter = require('./routes/admin')

var app = express();

// const lh = 'mongodb://127.0.0.1:27017/redeemer'  draganddrop
mongoose.connect("mongodb+srv://ibrahim:WJgo0lnPPZjsQhRs@draganddrop.w4gluc5.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  const oneDay = 1000 * 60 * 60 * 24;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: "thi&&&ismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false ,
  // secret: 'thecatISintheba@@', // Replace with your own secret key
  // resave: false,
  // saveUninitialized: false,
  
  // store: MongoStore.create({ mongoUrl: //"mongodb+srv://ibrahim:WJgo0lnPPZjsQhRs@draganddrop.w4gluc5.mongodb.net/?retryWrites=true&w=//majority" }),
  
  //store:  MongoStore.create({ 
    //Using connect-mongo as the session store
 // url: "mongodb+srv://ibrahim:WJgo0lnPPZjsQhRs@draganddrop.w4gluc5.mongodb.net/?retryWrites=true&w=majority",
    // Replace with your MongoDB connection URL
  //autoRemove: 'native', // Optional: Automatically remove expired sessions
    //ttl: 14 * 24 * 60 * 60, // Optional: Session TTL (in seconds) - example: 14 days
   //}),
}));

// app.use(isAuthenticated);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);


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
