const { createTransport } = require('nodemailer');

exports.contactForm = (req, res) => {
  const { email, name, message } = req.body;

  const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_TO,
      pass: process.env.PASSWORD_ME,
    },
  });

  const emailData = {
    from: process.env.EMAIL_TO,
    to: email,
    subject: `Contact form - ${process.env.APP_NAME}`,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://blogseomiroji.com</p>
        `
  };

  transporter.sendMail(emailData, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({
        success: true
      });
    }
  });
}

exports.contactBlogAuthorForm = (req, res) => {
  const { authorEmail, email, name, message } = req.body;
  // console.log(req.body);
  
  const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_TO,
      pass: process.env.PASSWORD_ME,
    },
  });

  let maillist = [authorEmail, process.env.EMAIL_TO];

  const emailData = {
    to: maillist,
    from: email,
    subject: `Someone messaged you from ${process.env.APP_NAME}`,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
          <h4>Message received from:</h4>
          <p>name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>
          <hr />
          <p>This email may contain sensetive information</p>
          <p>https://blogseomiroji.com</p>
      `
  };

  transporter.sendMail(emailData, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({
        success: true
      });
    }
  });
};


// note buat saya pribadi sih
// karna host nya pakai brevo sendinblue jadi harus aktivasi akun lengkap di brevo dulu
// agar nanti pada saat kirim message itu tidak ada peringatan pending sabab belum aktivasi secara lengkap
// karna ngisi data datanya belum lengkap 