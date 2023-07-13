const User = require('../models/user');
const shortId = require('shortid');
const jwto = require('jsonwebtoken'); // rename jwt token it doesn't crash
const { expressjwt: jwt } = require("express-jwt"); // 2023 update documentation

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
  userProperty: 'auth'
});




/* exports.signup = (req, res) => {
  const {name, email, password} = req.body
  res.json({
    user: {name, email, password}
  })
}
*/