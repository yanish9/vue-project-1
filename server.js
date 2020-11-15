var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var db = require('./models');

var isAuthenticated = require('./config/middleware/isAuthenticated');
const fs = require('fs');
var passport = require('./config/passport');
// var request = require('request');
var moment = require('moment');
var path = require('path');
var twilio = require('twilio');
var helmet = require('helmet');

var PORT = process.env.PORT ? process.env.PORT : 9000;
var PROXY = process.env.PROXY ? process.env.PROXY : 8000;

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//app.enable('trust proxy');

app.use(express.static(process.cwd() + '/public'));

console.log(process.cwd() + '/public');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());

// Import routes and give the server access to them.
var routes = require('./controller/apiController.js');
var routeshtml = require('./controller/html-routes.js');

var routesAdmin = require('./controller/adminController.js');

var routesRecipe = require('./controller/recipe-api.js');

app.use('/', routes);
app.use('/', routeshtml);
app.use('/', routesAdmin);
app.use('/', routesRecipe);

console.log('starting');

var notifiServiceTimer;

var regex_ = new RegExp(/^[a-zA-Z]+(\d?)+[_]+([T])+\d+[_]+([D])+\d+$/);

var regex_tank = new RegExp(/^([t])+([s])\d+$/);

//notifiService();

app
.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
})
.on('error', function(e) {
  logger_err.logger_(
    'Issue when creating server',
    e.toString(),
    'server',
    null,
    false,
    true
  );
});


// db.sequelize.sync(
//   { 
//     force: false 
//   }
//     ).then(
//   () => {
//     //    setTimeout(() => {}, 1000);

//     app
//       .listen(PORT, () => {
//         console.log(`App listening on PORT ${PORT}`);
//       })
//       .on('error', function(e) {
//         logger_err.logger_(
//           'Issue when creating server',
//           e.toString(),
//           'server',
//           null,
//           false,
//           true
//         );
//       });
//   },
//   err => {
//     console.log(err);
//   }
// );

