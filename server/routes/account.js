const { Router } = require('express');

const accountController = require('../controllers/account');

const router = Router();

//Get all Movies byId User
router.get('/:id', accountController.getAllMovies);
//Get Movie By id
// router.get('/:id', movieController.getMovieById);
//Add Movie by Admin
router.post('/add-movie',accountController.postAddMovie);

router.delete('/remove-movie',accountController.postRemoveMovie);

module.exports = router;