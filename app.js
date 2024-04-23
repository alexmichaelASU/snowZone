// app.js

const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import routes
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_server/routes/api');

const app = express();

// Database connection
const connectDB = require('./app_server/models/db');
connectDB();

//Import mongoose model
const { Product } = require('./app_server/models/Product');

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());


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

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

