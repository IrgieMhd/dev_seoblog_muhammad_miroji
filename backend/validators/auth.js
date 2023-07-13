const { body } = require('express-validator');

exports.userSignupValidator = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Must be valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 charachter long')
]

exports.userSigninValidator = [  
  body('email').isEmail().withMessage('Must be valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 charachter long')
]