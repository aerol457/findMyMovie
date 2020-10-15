const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const utils = require('../utils/utils');
const User = require('../models/user');

exports.postSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed.');
    error.data = errors.array();
    error.statusCode = 422;
    throw error;
  }
  const hashedPass = utils.genPassword(req.body.password);
  
  User.create({
      name: req.body.name, 
      email: req.body.email, 
      hash: hashedPass.hash,   
      salt: hashedPass.salt   
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
  const errors = validationResult(req);
  let currentUser;
  if(!errors.isEmpty()){
    const error = new Error('Validation failed.');
    error.data = errors.array();
    error.statusCode = 422;
    throw error;
  }
  User.findOne({
    where:{
      email: req.body.email
    }
  })
  .then(user => {
    currentUser = user;
    if(!user){
      res.status(404).json({message: 'E-Mail not found.'});
    }
    
    const isVaild = utils.checkPassword(req.body.password, user.hash, user.salt);
      if(!isVaild){
        res.status(401).json({message: 'Password invalid.'});
      }
      const pathToKey = path.join(__dirname, '..', 'utils','keys','id_rsa_priv.pem');
      const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
      const payload = {
        userId: currentUser.id,
        email: currentUser.email
      };
      const token = jwt.sign(payload, PRIV_KEY, {
        expiresIn: '1h'
      })
      res.status(200).json({
        token: token,
        userId: currentUser.id
      });
    })
  .catch(err => {
    console.log(err);
  })
}
