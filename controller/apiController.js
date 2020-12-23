var express = require('express');
var router = express.Router();
var db = require('../models');
var bcrypt = require('bcrypt');
var path = require('path');
var passport = require('../config/passport');
var request = require('request');
var moment = require('moment');

const config = require("../config/local_cred.json")
var isAuthenticated = require('../config/middleware/isAuthenticated');
var db = require('../models');
var mailer = require('../controller/email.js');
const login = require('../config/login');
var contactList = require('../controller/notifi/more/devcontact');
var sms = require('../controller/notifi/SmsManager');
var email = require('../controller/notifi/EmailManager');

var RateLimit = require('express-rate-limit');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

var limiterCritical = new RateLimit({
  windowMs: 60 * 6000 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  keyGenerator: function(req /*, res*/) {
    return req.user;
  }
});

var limiterOtherAPI = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  keyGenerator: function(req /*, res*/) {
    return req.user;
  }
});

//  apply to all reque

///////////////////// Sign In ///////////////////////////////////////////

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);


router.get("/api/drone-selling" ,  function(req, res) {
  
  const data = require('./files/details.json')
  console.log(data);
  res.json(data);

})


router.get("/api/status/:stat" , isAuthenticated,  function(req, res) {


  console.log("ok", req.params);

  res.json({"message" : "login verified", "token": req.params.stat});

//   console.log(req.body);
//   const credentials = auth(req);

//   if (!credentials) {

//     res.status(400).json({ message: 'Invalid Request !' });

//   } else {

//     console.log(credentials)

// }
}
);


router.post('/api/authenticate', (req, res) => {

  const credentials = auth(req);

  console.log("auth", credentials)
  if (!credentials) {

    res.status(400).json({ message: 'Invalid Request !' });

  } else {

    login.loginUser(credentials.name, credentials.pass)

    .then(result => {

      console.log(config.secret)
      const token = jwt.sign(result, config.secret, { expiresIn: 1440 });

      console.log("login success")
    
      res.status(result.status).json({ message: result.message, token: token });

    })

    .catch(function(e) {
      console.log(e);
      res.status(403).json({message:"Credentials not valid", err: 1});
    });
  }
});


router.post('/api/login', passport.authenticate('local'), function(req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed

  res.json({ success: 1 , token:"9876987"});
});

router.post('/api/signup', limiterCritical, function(req, res) {
  console.log(req.body);

  db.User.findOne({
    attributes: ['email_address'],
    where: {
      email_address: req.body.email_address
    }
  }).then(function(data) {
    console.log("checking email if exist");
    console.log(data);

    if (data) {
      return res.json({
        message: 'Email already exists',
        success: 0
      });
    }

  //   db.sequelize
  //   .query(
  //     ' SELECT * from  member'
  //   )
  //   .then(array => {
  //     var data = array[0];
  //  //   console.log(data);
    
  //     }
  //   )

//   db.Member.create({
//     username: "heyyyy",
//     // first_name: req.body.first_name,
//     // last_name: req.body.last_name,
//     email_address: "heyyyy@gmail.com",
//     password: "heyyyy",
//     status: 2,
//     group_id: 1,
//     createdat: "2019-08-11 23:49:19"
// })
console.log("create-------------------------------------------------")
    db.User.create({
      username: req.body.username,
      // first_name: req.body.first_name,
      // last_name: req.body.last_name,
      email_address: req.body.email_address,
      passwrd: req.body.password
    })
      .then(function() {
        console.log("done-------------------------------------------------")
        res.redirect(307, '/api/login');
      })
      .catch(function(err) {
        res.json({"message":err});
      });
  });
});

// Migrated this endpoint over to Django, 2019-05-28, Dave Taylor
//
// Automatic redirects
// router.get('/api/redirect', function(req, res) {
//   if (!req.user) {
//     res.redirect('/');
//   } else {
//     res.redirect('/dashboard');
//   }
// });

// Respond to client heartbeats Moved to Django
// router.get('/api/heartbeat', function(req, res) {
//   if (req.user) {
//     res.status(200).json();
//   }
// });

// Route for logging user out
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Route for getting some data about our user to be used client side
// router.get('/api/user_data', function(req, res) {
//   // console.log(req.user);
//   if (!req.user) {
//     // The user is not logged in, send back an empty object
//     res.json({ success: 0 });
//   } else {
//     // Otherwise send back the user's email and id
//     // Sending back a password, even a hashed password, isn't a good idea
//
//     db.User.findOne({
//       where: { email_address: req.user.email_address }
//     }).then(function(user) {
//       res.json({
//         success: 1,
//         email: user.email_address,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         phone_num: user.phone,
//         username: user.user_name
//         // id: user.user_id,
//       });
//     });
//   }
// });


//////////////////////////////////////////////////////////////////

module.exports = router;

function report() {}
