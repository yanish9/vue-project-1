// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');

var express = require('express');

var router = express.Router();
var db = require('../models');
// Routes

// =============================================================


// Migrated to Django. Dave Taylor

// Each of the below routes just handles the HTML page that the user gets sent to.

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/dist/dashboard.html'));
});

router.get('/resetPassword/email/t', function(req, res) {
  // console.log(req.query['m'])

  // console.log(req.query.m, req.query.i)
  // return;

  if (!req.query.i) return;

  if (!req.query.m) return;

  var tok = req.query.m;
  var email_add = req.query.i;

  console.log(req.query, req.params, email_add);

  db.sequelize
    .query(
      ' SELECT * from  retrieve_user (:em)',
      {
        replacements: { em: email_add }
      }
    )
    .then(array => {
      var data = array[0];
      console.log(data.length);
      if (!data.length) {
        res.end();
        return;
      }

      if (data[0].temp_token)
        if (
          tok.localeCompare(
            data[0].temp_token
              .substring(0, data[0].temp_token.lastIndexOf('_'))
              .trim()
          ) == 0
        ) {
          res.sendFile(path.join(__dirname + '/../public/dist/passwordreset.html'));
        }
    });
});

module.exports = router;
