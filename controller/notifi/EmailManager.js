var contact_email = 'contact@bostechusa.com';
var support = 'support@bostechusa.com';
var no_reply_email = 'no-reply@bostechusa.com';
var user_email = 'pavel@bostechusa.com';


var nodemailer = require('nodemailer');

//emailTo -> destination
//from -> contact = contact@bostechusa.com / noreply = no-reply@bostechusa.com
//extraMessage is an object that holds data like device/sensor info
function email_(emailTo, from, msg, extraMessage, subject) {
  //  console.log(email);

  if (!subject) subject = 'Hello ✔';

  console.log('email. ');

  var emailFrom;
  console.log(from);

  console.log('email.. ');

  var transporter = nodemailer.createTransport({
    host: 'smtp-relay.gmail.com',
    secure: true,
    //service: 'gmail',
    auth: {
      user: user_email,
      pass: 'qewjyqywtxztztec'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  var date = new Date();

  var mailOptions = {
    from: '"BOS Team 👻" <no-reply@bostechusa.com>', // sender address
    to: emailTo, // list of receivers
    subject: subject, // Subject line
    html: createContent()
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('error');
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  function createContent(params) {
    return msg;
  }
}

module.exports.email_ = email_;
