const { body } = require('express-validator');

exports.contactFormValidator = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Must be valid email address'),
  body('message')
    .not()
    .isEmpty()
    .isLength({ min: 20 })
    .withMessage('Message must be at least 20 characters long')
];