// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');

var express = require('express');

var router = express.Router();
var db = require('../models');
var request = require("request");
// Routes

// =============================================================


// Migrated to Django. Dave Taylor

// Each of the below routes just handles the HTML page that the user gets sent to.

router.get('/recipe/98765', function(req, res) {


  var optionRecipe = {
    url: 'https://api.edamam.com/search?q=chicken&app_id=2ffc76d2&app_key=b36539ee470c2215951f492f00f448ae',
    headers: {
      // Authorization: 'Basic '+ config.digi.header
    }
  };
  
  function callbackRecipeList(error, response, body) {
    console.log('Getting List stream ' + error);
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body);
      console.log('got list!');
      // console.log(info);
      filterResults(info.hits)
      //compareAndInsertData(info);
    } else {
      console.log('Error');
  
      //logError(error);
    }
  }


  function filterResults(results){

    for (var  i = 0 ; i <results.length ; i++){
      console.log(results[i].recipe.label)
      console.log(results[i].recipe.image)
    }

  }


  request(optionRecipe, callbackRecipeList);
  

});


module.exports = router;
