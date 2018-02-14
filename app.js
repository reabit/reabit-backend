const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(cors())

// require('dotenv').config()
// console.log(process, 'erakodakodkawodkdo')
// mongoose.connection.openUri(process.env.DATABASE_MONGO_LOCALHOST);
// mongoose.Promise = global.Promise;
// mongoose.connection.once('open', () => {
//   console.log('mongoose connection success');
// }).on('error', (error) => {
//   console.log('connection error', error);
// })
mongoose.connect('mongodb://localhost:27017/reabit')


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', require('./routes/users'));
app.use('/cheerio', require('./routes/cheerio'));
app.use('/readings', require('./routes/readings'));
app.use('/summarys', require('./routes/summarys'));
app.use('/chatbot', require('./routes/chatbot'))
app.use('/history', require('./routes/history'))

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
