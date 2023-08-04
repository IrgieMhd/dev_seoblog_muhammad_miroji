const User = require('../models/user');
const Blog = require('../models/blog');
const shortId = require('shortid');
const jwto = require('jsonwebtoken'); // rename jwt token it doesn't crash
const { expressjwt: jwt } = require("express-jwt"); // 2023 update documentation
const { errorHandler } = require('../helpers/dbErrorHandler');
const { createTransport } = require('nodemailer');


const transporter = createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_TO,
    pass: process.env.PASSWORD_ME,
  },
});


exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is being taken"
      })
    }

    const { name, email, password } = req.body;
    let username = shortId.generate()
    let profile = `${process.env.CLIENT_URL}/profile/${username}`

    let newUser = new User({ name, email, password, profile, username })
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      // res.json({ user: success }) 
      /* input res.json is
      "user": {
      "username": "6lqb_osvp",
      "name": "Muhammad Miroji",
      "email": "miroji@gmail.com",
      "profile": "http://localhost:3000/profile/6lqb_OSvp",
      "hashed_password": "bf750747b4255053090bf324a8ede1dc05ae558f",
      "salt": "694455162362",
      "_id": "64accd59325f986110c1a82d",
      "__v": 0
      }
      */

      res.json({
        message: "Sign Up Success, Please Sign In!"
      })
    })
  })
}

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with email doesn't exist. Please Signup!"
      })
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match!!"
      })
    }
    // generate a token and send to client
    const token = jwto.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, { expiresIn: '1d' })
    const { _id, username, name, email, role } = user
    return res.json({
      token,
      user: { _id, username, name, email, role } // without this info will complete
    })
  })
}

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Signout success'
  });
};

exports.requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // adding documentation library update 2023
  requestProperty: 'user',
  //userProperty: 'auth' // cannot property reading _id or showing only {} in console
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (user.role !== 1) {
      return res.status(400).json({
        error: 'Admin resource. Access denied!'
      });
    }

    req.profile = user;
    next();
  });
};

exports.canUpdateDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    let authorizedUser = data.postedBy._id.toString() === req.profile._id.toString();
    if (!authorizedUser) {
      return res.status(400).json({
        error: 'You are not authorized'
      });
    }
    next();
  });
};


exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'User with that email does not exist'
      });
    }

    const token = jwto.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });

    // email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password reset link`,
      html: `
          <p>Please use the following link to reset your password:</p>
          <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
          <hr />
          <p>This email may contain sensetive information</p>
          <p>https://blogseomiroji.com</p>
      `
    };
    // populating the db > user > resetPasswordLink
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      } else {
        transporter.sendMail(emailData, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            return res.json({
              message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`
            });
          }
        });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  //
};



/* exports.signup = (req, res) => {
  const {name, email, password} = req.body
  res.json({
    user: {name, email, password}
  })
}
*/