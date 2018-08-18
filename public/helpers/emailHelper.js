var fs = require("fs");
var handlebars = require('handlebars');
var sgHelper = require('sendgrid').mail;

module.exports.emailDocument = function emailDocument(app, templateName, templateData, emailData, cb, filePath, targetFileName, footerTemplate){
        var emailWillTemplate = fs.readFileSync(__dirname + '/../templates/' + templateName + '.md');
        var emailTemplate = handlebars.compile(String(emailWillTemplate));

        var superEmailTemplate = fs.readFileSync(__dirname + '/../templates/superEmailTemplate.md');
        superEmailTemplate = handlebars.compile(String(superEmailTemplate));

        var emailFooterTemplate;

        if(!footerTemplate){
            footerTemplate = 'defaultEmailFooter';
        }

        emailFooterTemplate = fs.readFileSync(__dirname + '/../templates/' + footerTemplate + '.md');
        emailFooterTemplate = handlebars.compile(String(emailFooterTemplate));
        
        var recipients;
                                    
        if(Array.isArray(emailData.recipients)){
            recipients = emailData.recipients.join();
        }
        else{
            recipients = emailData.recipients;
        }

        var superEmailTemplateData = {
            emailTitle: emailData.subject,
            content: emailTemplate(templateData),
            footer: emailFooterTemplate
        };

        // var emailObject = {
        //     to: recipients,
        //     subject: emailData.subject,
        //     html: superEmailTemplate(superEmailTemplateData)
        // }; 

        // app.models.Email.send(emailObject, function(err, mail) {                   
        //     cb(err, mail);
        // });

        from_email = new sgHelper.Email('noreply@assetvault.co');
        to_email = new sgHelper.Email(recipients);
        subject = emailData.subject;
        content = new sgHelper.Content('text/html', superEmailTemplate(superEmailTemplateData));
        mail = new sgHelper.Mail(from_email, subject, to_email, content);

        if (recipients.split(',').length > 1) {
            for (var i = 1; i < recipients.split(',').length; i++) {
                var arr = recipients.split(',');
                email = new sgHelper.Email(arr[i]);
                mail.personalizations[0].addTo(email);
            }
        }

        if (filePath && targetFileName) {
            // emailObject.attachments = [{
            //     filename: targetFileName,
            //     path: attachment
            // }];

            var attachment = new sgHelper.Attachment();
            var file = fs.readFileSync(filePath);
            var base64File = new Buffer(file).toString('base64');
            attachment.setContent(base64File);
            attachment.setType('application/pdf');
            attachment.setFilename(targetFileName);
            attachment.setDisposition('attachment');
            mail.addAttachment(attachment);
        }
        
        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });


        sg.API(request, function (error, response) {
            
            cb(error, response);
        })
    };
