const {Router} = require('express');
const { body } = require('express-validator');
const passport = require('passport');


const authController = require('../controllers/auth');
const User = require('../models/user');

const router = Router();

router.post('/sign-up',
body('name').trim().isLength({min: 3}).withMessage('Name too short.'),
body('email').isEmail().normalizeEmail().custom((value) => {
  return User.findOne({
    where:{
      email: value
    }
  })
  .then(user => {
    if(user){
      return Promise.reject('E-Mail already in use.')
    }
  })
}),
body('email').isEmail().normalizeEmail(),
body('password').isAlphanumeric().isLength({min: 6, max: 16})
.withMessage('Password length between 6-16 characters, only numbers and letters.'),
body('confirmPassword','Passwords not match.').custom((value, {req}) => {
  if(value !== req.body.password){
    return false;
  }
  return true;
})
, authController.postSignUp);

router.post('/login',
body('email').isEmail().normalizeEmail(),
body('password').isAlphanumeric().isLength({min: 6, max: 16})
.withMessage('Password length between 6-16 characters, only numbers and letters.'),
authController.postLogin);

router.get('/protected', passport.authenticate('jwt', { failureRedirect:'/', session: false }), (req, res, next) => {
  res.status(200).json({ success: true, msg: "You are authorized" })
});

module.exports = router;