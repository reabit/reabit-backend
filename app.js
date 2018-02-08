const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(cors())

require('dotenv').config()

mongoose.connect(process.env.DATABASE_MONGO_LOCALHOST)

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/cheerio', require('./routes/cheerio'));
app.use('/readings', require('./routes/readings'));
app.use('/summarys', require('./routes/summarys'));
app.use('/chatbot', require('./routes/chatbot'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
