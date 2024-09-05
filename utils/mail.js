require("dotenv").config();

const nodemailer = require("nodemailer");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUND_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendMail = async (email, subject, message) => {
  const transporter = await nodemailer.createTransport({
    service: process.env.NODEMAIL_SERVICE,
    auth: {
      user: process.env.NODEMAIL_USER,
      pass: process.env.NODEMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"EMS" <${process.env.NODEMAIL_USER}>`,
    to: email,
    subject: subject,
    html: message,
  });
  console.log(info);
};

const sendSMS = async (message, clientNo) => {
  let msgOptions = {
    from: process.env.TWILIO_PHONE_NO,
    to: clientNo,
    body: message,
  };
  try {
    const msg = await client.messages.create(msgOptions);
    console.log("sms", msg.sid);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMail,
  sendSMS,
};
