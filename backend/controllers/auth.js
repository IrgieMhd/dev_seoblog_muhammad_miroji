const User = require('../models/user');
const shortId = require('shortid');

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).then((err, user) => {
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
      res.json({
        user: success
      })
      // res.json({
      // message: "Sign Up Success, Please Sign In!"
      // })
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