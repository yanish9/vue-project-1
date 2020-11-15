var contact_email = 'contact@bostechusa.com';
var no_reply_email = 'no-reply@bostechusa.com';

var nodemailer = require('nodemailer');
var twilio = require('twilio');

function sms(body, to, from, res) {
  if (from == undefined) from = '+14078459142';

  if (body == undefined || to == undefined || from == undefined) return;

  console.log('Sending');
  var accountSid = 'AC5217f27fe9c132ac9083237f64fb72c1'; // Your Account SID from www.twilio.com/console
  var authToken = 'de58462ab6da92702a69d86bdf0839d8'; // Your Auth Token from www.twilio.com/console

  var client = new twilio(accountSid, authToken);

  console.log(client);

  client.messages
    .create({
      body: body,
      to: to, // Text this number
      from: '+14078459142' // From a valid Twilio number
    })
    .then(function(params) {
      console.log(message.sid);
    });
}

function smsNotifi(body, to, nid, done) {
  console.log('Sending');
  var accountSid = 'AC5217f27fe9c132ac9083237f64fb72c1'; // Your Account SID from www.twilio.com/console
  var authToken = 'de58462ab6da92702a69d86bdf0839d8'; // Your Auth Token from www.twilio.com/console

  var client = new twilio(accountSid, authToken);

  //console.log(client)
  var n = nid;
  client.messages
    .create({
      body: body,
      to: to, // Text this number
      from: '+14078459142' // From a valid Twilio number
    })
    .then(function(params) {
      //  console.log(message.sid)

      done({ success: 1, msg: 'done', nid: nid });
    })
    .catch(function(err) {
      done({ success: 0, msg: 'Error occured ' + err.message }, err);
    });
}

module.exports.sms = sms;

module.exports.smsNotifi = smsNotifi;
