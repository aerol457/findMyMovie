const Movie = require('../models/movie');
const User = require('../models/user');

exports.getAllMovies = (req, res, next) => {
  Movie.findAll({
    include: {
      model: User,
      where:{
        id: req.params.id
      }
    }
  })
  .then(movies => {
    console.log(JSON.stringify(movies, null, 2))
    if(!movies){
      res.status(404).json({message: 'Not Movies Found yet.'});
    }
    res.status(200).json({data: movies})
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  })
 
}

exports.postMovie = (req, res, next) => {
  const idUser = req.body.idUser;
  const idMovie = req.body.idMovie;

  UserMovie.create({
    userId: idUser,
    movieId: idMovie,
  })
  .then(data => {
    res.status(200).json({data: data}); 
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  })
}