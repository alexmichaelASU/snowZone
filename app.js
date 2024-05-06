// app.js
const passport = require('passport');
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
require('./app_server/config/passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const User = require('./app_server/models/user');
// Import routes
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_server/routes/api');

const app = express();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(passport.initialize());

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
      res.status(401).json({ message: 'Unauthorized' });
  } else {
      console.error(err);
      next(err);
  }
});

// Database connection
const connectDB = require('./app_server/models/db');
connectDB();

//Import mongoose model
const { Product } = require('./app_server/models/Product');
const {WishList} = require('./app_server/models/Wishlist');

 
// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'app_public', 'dist', 'snow-zone', 'browser')));

// Routes setup 
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/uploads', express.static('uploads'));
app.get('*', (req, res, next) => {
    if (req.path !== '/api') {
      res.sendFile(path.join(__dirname, 'app_public', 'dist', 'snow-zone', 'browser', 'index.html'));
    } else {
      next();
    }
  });
 
// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

