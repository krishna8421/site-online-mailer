const sgMail = require("@sendgrid/mail");
const https = require("https");

sgMail.setApiKey(process.env.SendGridApi);

SiteToCheck = "www.google.com"

const msg = {
  to: [
    {
      email: process.env.FirstEmail,
    },
  ],
  cc: [
    {
      email: process.env.SecondEmail,
    },
  ],
  from: `${process.env.YourName} <${process.env.YourMail}>`,
  subject: " Site Report",
  html: `
  <center>Site online 🥳🥳🥳</center>
  `,
};

const sendMail = () => {
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

const checkSite = () => {
  try {
    https.get({ host: SiteToCheck }, function (res) {
      if (res.statusCode == 200) {
        console.log("Website Up");
        sendMail();
        console.log(res.statusCode);
        clearInterval(interval);
      } else {
        console.log("Website down");
        console.log(res.statusCode);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const interval = setInterval(checkSite, 120 * 1000);
