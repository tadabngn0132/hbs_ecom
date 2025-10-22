var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session'); // THÊM MỚI

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category.js');
var productRouter = require('./routes/product');
var authRouter = require('./routes/auth'); // THÊM MỚI

var app = express();
var database = "mongodb://localhost:27017/web"

const { log } = require('console');

// MongoDB connection
mongoose.connect(database)
  .then(() => log('Connection database successfully'))
  .catch((err) => console.error('Connection database failure', err))

// view engine setup
var hbs = require('hbs'); // THÊM MỚI
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials"); // THÊM MỚI (nếu dùng partials)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration - THÊM MỚI
const timeout = 10000 * 60 * 60 * 24; // 24 hours (in milliseconds)
app.use(session({
  secret: "practice_makes_perfect", // Secret key để mã hóa session
  saveUninitialized: false,
  cookie: { maxAge: timeout },
  resave: false
}));

// Make session variables accessible in views - THÊM MỚI
// QUAN TRỌNG: Phải đặt TRƯỚC khi khai báo routes
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/auth', authRouter); // THÊM MỚI

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

app.listen(4000, () => {
  log('Server is running at http://localhost:4000/')
}); 

module.exports = app;