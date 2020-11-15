const config = require("../local_cred.json")
 

const jwt = require('jsonwebtoken');

module.exports = function isAuthenticated(req, res, next) {

  const token = req.headers['x-access-token'];
  console.log(token);

		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);
         	 	console.log("done verify" , decoded )
  			
          		next();

			} catch(err) {

			console.log("token invalid")
			console.log(err)
			res.status(403).json({ message: "not valid credentials/tok"})
			

			}

		} else {

    		console.log("returning false")
			return false;
		}
	
}

// // This is middleware for restrictng routes a user is not allowed to visit if not logged in
// module.exports = function(req, res, next) {
//   // If the user is logged in, continue with the request to the restricted route
//   if (req.user) {
//     return next();
//   }

//   // If the user isnt' logged in, redirect them to the login page
//   //return res.redirect("/");
// };
