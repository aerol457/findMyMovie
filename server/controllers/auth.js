const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.postSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed.');
    error.data = errors.array();
    error.statusCode = 422;
    throw error;
  }
  User.create({
    name: req.body.name, 
    email: req.body.email, 
    password: req.body.password   
  })
  .then(user => {
    res.status(200).json({message: 'User created successfully!', userId: user.id});
  })
  .catch(err => {
    err.message = err;
    err.statusCode = 500;
    next(err);
  })
    
}

exports.postLogin = (req, res, next) => {
  User.findOne({
    where:{
      email: req.body.email
    }
  })
  .then(user => {
    if(!user){
      res.status(404).json({message: 'E-Mail not found.'});
    }
    
    if(user.password !== req.body.password){
      res.status(401).json({message: 'Password invalid.'});
    }
    
    res.status(200).json({message: 'Login Succeded.', userId: user.id});

  })
  .catch()
}
