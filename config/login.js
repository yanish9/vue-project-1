'use strict';
var db = require('../models');
const bcrypt = require('bcrypt');

exports.loginUser = (email, password) => 

	new Promise((resolve,reject) => {

		db.User.findOne({
            where: {
                email_address: email
            }
        }).then(function(dbUser) {


            console.log("login 1")
            if (!dbUser) {

				reject({ status: 404, message: 'User Not Found !' });

			} else {

				return dbUser;
				
			}
		})

		.then(user => {

            console.log("login 2")
			const hashed_password = user.password;

			if (bcrypt.compareSync(password, hashed_password)) {

				resolve({ status: 200, message: email });

			} else {

				reject({ status: 401, message: 'Invalid Credentials !' });
			}
		})

		.catch(err => reject({ status: 500, message: err }));

	});
