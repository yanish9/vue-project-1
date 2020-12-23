// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt");
// Creating our Member model
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwrd: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        temp_token: {
            type: DataTypes.STRING
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        // },
        // createdat: {
        //     type: DataTypes.DATE,
        //     allowNull: true
        // },
        // updatedat: {
        //     type: DataTypes.DATE,
        //     allowNull: true
        // },
        // status: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        // group_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        // temp_token: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        },
    }, {
        // Creating a custom method for our Member model.
        // This will check if an unhashed password entered by
        // The user can be compared to the hashed password stored in our database

        // schema: 'hungrme_db',
        tableName: 'users',
        timestamps:false,
        // Hooks are automatic methods that run during various phases of the Member Model lifecycle
        // In this case, before a Member is created, we will automatically hash their password
        hooks: {
            beforeCreate: function(user, options, cb) {  
                console.log("im creating a user", user.dataValues.passwrd);  
                user.dataValues.passwrd = bcrypt.hashSync(user.dataValues.passwrd, bcrypt.genSaltSync(10), null);  
                console.log("im creating a user", user);  
                //cb(null, options);  
            }, 
            beforeUpdate: function(user) {
                console.log("im updating a user");
                user.dataValues.passwrd = bcrypt.hashSync(user.dataValues.passwrd, bcrypt.genSaltSync(10), null);
            }
        }
    });

    User.prototype.validPassword = function(password) {
        console.log('validate pwd')
        let hashed = this.passwrd;
        if (hashed.substring(0, 7) == 'bcrypt$'){
            hashed = hashed.substring(7, hashed.length);
        }
        return bcrypt.compareSync(password, hashed);
    };

    return User;
};
