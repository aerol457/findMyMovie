const { Router } = require('express');
const passport = require('passport');

const accountController = require('../controllers/account');

const router = Router();

//Get all Movies byId User
router.get('/:id',passport.authenticate('jwt', { session: false }), accountController.getAllMovies);  
//Add Movie by Admin
router.post('/add-movie',passport.authenticate('jwt', { session: false}),accountController.postAddMovie);
//Remove Movie by Admin
router.delete('/remove-movie',passport.authenticate('jwt', { session: false }),accountController.postRemoveMovie);

module.exports = router;