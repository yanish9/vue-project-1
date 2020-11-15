

var nodemailer = require('nodemailer');
var twilio = require('twilio');
var db = require('../../models');
var moment = require('moment');
var sms = require('../notifi/SmsManager'); 
var email = require('../notifi/EmailManager');   


var defaultEmailAdd = "no-reply@bostechusa.com"

function logger_ (description, error_msg , type,  date_created,   notify,  critical) { 

    
    
    // if (!description || !error_msg  || !type || !date_created  || !notify  || !critical )
    // return;
    
    if (!description )
    description = "Default description. "

    if (!error_msg )
    error_msg = "Default error msg. "
    
    if (!type )
    type = "other"

    if (!date_created )
    date_created = moment.utc().format();

    if (!notify )
    notify = false;

    if (!critical )
    critical = false ;


    db.sequelize
    .query(' SELECT * from  log_error_all (:description_, :error_msg_ , :type_ , :date_created_ , :notify_ , :critical_)', { 
      replacements: {  description_: description , error_msg_:error_msg ,
                       type_: type,  date_created_:  date_created, 
                       notify_: notify , critical_: critical }   
    })
    .then(array => {   
                       var data = array[0] ;
                             if (critical){
                                email.email_( defaultEmailAdd , null , "<h3>"+description+ "</h3>" + "<h5>" + error_msg + "</h5>", null, null);
                             }
                     
                
      })
  
  
  }
  
  
module.exports.logger_ = logger_ ; 
