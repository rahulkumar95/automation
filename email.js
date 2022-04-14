const debug = require('debug')('automation:Email');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: global.gConfig.mail.email,
    pass: global.gConfig.mail.app_password,
  },
});

const sendMail = (from, to, subject, text) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      debug('Error in send email ', error);
    } else {
      debug(`Email sent: ${info.response}`);
    }
  });
};

exports.sendMail = sendMail;
