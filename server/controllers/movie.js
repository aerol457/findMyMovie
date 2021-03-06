const Movie = require('../models/movie');

exports.getAllMovies = (req, res, next) => {
  Movie.findAll()
  .then(movies => {
    if(!movies){
      res.status(404).json({message: 'Not found movies please added to see some.'});
    }
    res.status(200).json({data: movies});
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  })
}

exports.getMovieById = (req, res, next) => {
  const idMovie = req.params.id;
  Movie.findByPk(idMovie)
  .then(movie => {
    if(!movie){
      return res.status(404).json({message: 'Movie not found.'});
    }
    res.status(200).json({data:movie});
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
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const imageUrl = req.body.imageUrl;
  
  Movie.create({
    title: title,
    description: description,
    category: category,
    imageUrl: imageUrl,
    rate: 0
  })
  .then(movie => {
    res.status(200).json({message: 'Movie created!', data: movie});
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  })
}