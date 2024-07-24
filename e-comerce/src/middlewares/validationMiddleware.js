const { check, validationResult } = require('express-validator');

const validateUserRegistration = () => [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Please include a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('register', {
        errors: errors.array(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
      });
    }
    next();
  }
];

module.exports = validateUserRegistration;
