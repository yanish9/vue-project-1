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



router.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/admin_.html'));
});



router.get("/api/status/:stat" , isAuthenticated,  function(req, res) {


  console.log("ok", req.params);

  res.json({"message" : "login verified", "token": req.params.stat});

}
);


router.post('/api/authenticate', (req, res) => {

  const credentials = auth(req);

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


router.post('/add_branch', function(req, res) {

  console.log(req.body);

  var branchName= req.body.branchName
  var branchId=req.body.branchId
  
  var merchantId= req.body.merchantId;
  var address=req.body.address
  
  var phone= req.body.phone
  var xcoor=req.body.xCoordinate;
  var ycoor=req.body.yCoordinate;

  db.sequelize
    .query(
      'INSERT INTO hungrme_db.branch (  merchantId, branchName, address, xCoordinate, yCoordinate, telephone) VALUES ( :merchantId_, :branchName_ , :address_ , :xCoordinate_, :yCoordinate_, :telephone_);',
        {
          replacements:{
            branchName_: branchName,
            merchantId_: merchantId,
            address_: address,
            telephone_: phone,
            xCoordinate_: xcoor,
            yCoordinate_: ycoor

          }
        } )
    .then(array => {

      res.json({success: 1});

      })


})


router.get('/branch', function(req, res) {
  db.sequelize
    .query(
       'select br.branchId , br.branchName , merch.merchantId , merch.businessName  , br.address , br.telephone  , br.xCoordinate  , br.yCoordinate from hungrme_db.branch as br INNER JOIN hungrme_db.merchant as merch;'
    // 'SELECT * FROM hungrme_db.branch h;'
      )
    .then(array => {
      var data = array[0];
     res.json(data)
      })
});

router.post('/admin/add_branch', function(req, res) {

console.log(req.params.id);


    db.sequelize
    .query(
      'select br.branchId , br.branchName , merch.merchantId , merch.businessName  , br.address , br.telephone  , br.xCoordinate  , br.yCoordinate from hungrme_db.branch as br INNER JOIN hungrme_db.merchant as merch'
    )
    .then(array => {
      var data = array[0];
     console.log(array);
    
     console.log("data");
     console.log(data);
      }
    )




});


//////////////////////////////////////////////////////////////////

module.exports = router;

function report() {}
