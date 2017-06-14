  var express = require('express');
  var path = require('path');
  const favicon = require('express-favicon');
  var logger = require('morgan');
  const sass = require('node-sass-middleware');

  var index = require('./routes/index');

  var app = express();

  // view engine setup
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));

  app.use(express.static(path.join(__dirname, 'public')));

  app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public')
  }));

  app.use('/', index);
  app.use('/home', index);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
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
    res.render('error');
  });


  app.listen(app.get('port'), function () {
      console.log("Express server listening on port " + app.get('port'));
  });

  module.exports = app;

