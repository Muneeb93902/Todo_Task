var fs = require("fs");
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


exports.emailDocument = function (senderEmail, senderPassword, recipientEmail, emailSubject, emailTemplate, emailText, emailData, cb){


    readHTMLFile(emailTemplate, function(err, html) {
        var template = handlebars.compile(html);
        
        var htmlToSend = template(emailData);

        var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        ssl: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
          user: senderEmail,
          pass: senderPassword
        }
        });

        var mailOptions = {
            from: senderEmail,
            to: recipientEmail,
            subject: emailSubject,
            text: emailText,
            html:htmlToSend
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);  
              cb(true,error);
            } else {            
              console.log('Email sent: ' + info.response);
              cb(false,'Email sent successfully')
            }
        });


    }); 

      /*
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        ssl: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
          user: senderEmail,
          pass: senderPassword
        }
      });

      var mailOptions = {
        from: senderEmail,
        to: recipientEmail,
        subject: emailSubject,
        text: emailText,
        html:emailTemplate
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);  
          cb(true,error);
        } else {            
          console.log('Email sent: ' + info.response);
          cb(false,'Email sent')
        }
      });
      */
    };
