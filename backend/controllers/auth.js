const User = require('../models/user');
const shortId = require('shortid');

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

/* exports.signup = (req, res) => {
  const {name, email, password} = req.body
  res.json({
    user: {name, email, password}
  })
}
*/