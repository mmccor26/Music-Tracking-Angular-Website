// JavaScript File
let nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"se3316test@gmail.com",
    pass:"password_12345"
  }
});

module.exports.sendMail = function(recpEmail, activateUrl){
  let mailOpts = {
    from:"se3316test@gmail.com",
    to:recpEmail,
    subject:"Activate Account",
    text:"Follow the link to activate your account: "+activateUrl
  }

  transport.sendMail(mailOpts, function(err, info){
    if(err){
      console.log(err);
      return false;
    }else{
      console.log('Email sent: '+info.response);
      return true;
    }
  });
}