const passport = require('passport');
const { Router } = require('express');

const movieController = require('../controllers/movie');

const router = Router();

//Get all Movies
router.get('/movies', movieController.getAllMovies);
//Get Movie By id
router.get('/:id', movieController.getMovieById);
//Add Movie by Admin
router.post('/add-movie',passport.authenticate('jwt', { session: false} ),movieController.postMovie);

module.exports = router;