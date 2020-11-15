var nodemailer = require('nodemailer');
var SendEmail = function(header, data, emailAuth) {
  //Emailauth = {user, pass}; header = JSON of {src, dest, subj}; data = string representing html message
  if (emailAuth === undefined) {
    //defines default login and email src for testmail
    emailAuth = {
      user: 'yanishguru@gmail.com',
      pass: 'mkonjibhu'
    };
    header.src = 'medi.iot.testmail@gmail.com';
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailAuth.user,
      pass: emailAuth.pass
    }
  });

  var mailOptions = {
    from: header.src, // sender address
    to: header.dest, // list of receivers
    subject: header.subj, // Subject line
    html: data // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      return { success: 0, message: JSON.parse(err) };
    } else {
      console.log(info);
      return { success: 1, message: JSON.parse(info) };
    }
  });
};
module.exports = { SendEmail: SendEmail };
