const Movie = require('../models/movie');
const User = require('../models/user');
const UserMovie = require('../models/userMovie');

exports.getAllMovies = async (req, res, next) => {
  Movie.findAll({
    include: {
      model: User,
      where:{
        id: req.params.id,
      }
    }
  })
  .then(movies => {
    if(!movies){
      return res.status(404).json({message: 'Not Movies Found yet.'});
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

exports.postAddMovie = async (req, res, next) => {
  const idUser = req.body.idUser;
  const idMovie = req.body.idMovie;
  try{
    const userExits = await UserMovie.findOne({where: {userId: idUser, movieId: idMovie}});
    if(!userExits){
      const data = await UserMovie.create({userId: idUser,movieId: idMovie, isChecked: true});
      return res.status(200).json({data: data});
    } 
    res.status(406).json({message: "Movie already added."});
  }
  catch(err){
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  }

}
                                
exports.postRemoveMovie = (req, res, next) => {
  const idUser = req.query.idUser;
  const idMovie = req.query.idMovie;
  UserMovie.destroy({
    where: {
      userId: idUser,
      movieId: idMovie
    }
  })
  .then(movie => {
    if(!movie){
      return res.status(404).json({message: 'Not Movie Found yet.'});
    }
    res.status(200).json({message: 'Delete Movie succeded.'});
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  })
}