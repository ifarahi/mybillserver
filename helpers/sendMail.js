const nodemailer = require("nodemailer");
const MAIL_PWD= "19ad74181f4d58c00e504fb817bbb57a-9dfbeecd-21af8a74";

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: "hamid@act4com.wtf",
    pass: MAIL_PWD || ""
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to send mails!");
  }
});

module.exports.send = async mailInfos => {
  let info = await transporter.sendMail({
    from: '"MyBill community 👻"',
    to: mailInfos.receiver,
    subject: mailInfos.subject,
    text: mailInfos.body,
    html: mailInfos.html
  });
  console.log(info);
  return true;
};