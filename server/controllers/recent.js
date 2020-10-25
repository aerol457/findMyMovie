const Recent = require('../models/recent');
const Movie = require('../models/movie');

exports.getAllRecents = async (req, res, next) => {
    Movie.findAll({
      include: {
        model: Recent,
        where: {
          userId: req.params.id
        }
      }
    })
    .then(recents => {
      res.json({data: recents});
    })
    .catch(err => {
      if(!err.statusCode){
        err.statusCode = 500;
      }
      err.message = err;
      next(err);
    })
}

exports.postAddRecent = async (req, res, next) => {
  const idUser = req.body.idUser;
  const idMovie = req.body.idMovie;
  let isExits; 
  await Recent.findOne({
    where: {
      userId: idUser,
      movieId: idMovie
    }
  })
  .then(recent => {
    if(recent){
      isExits = true;
      recent.changed('updatedAt', true);
      recent.update({
        updatedAt: Date.now()
      })
      .then(updatedRecent => {
        res.status(200).json({data: updatedRecent});
      })
      .catch(err => {
        if(!err.statusCode){
          err.statusCode = 500;
        }
        err.message = err;
        next(err);
      })
    }else{
      isExits = false;
    }
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  })

  if(!isExits){
    let deleteIdMovie = -1;
    await Recent.findAndCountAll({where:{userId: idUser}})
    .then(recents => {
      if(recents.count === 3){
        deleteIdMovie = recents.rows[0];
        for(let recent of recents.rows){
          if(recent.updatedAt < deleteIdMovie.updatedAt){
            deleteIdMovie = recent;
          }
        }
      }
    })
    .catch(err => {
      if(!err.statusCode){
        err.statusCode = 500;
      }
      err.message = err;
      next(err);
    })

    if(deleteIdMovie !== -1){
      await Recent.destroy({where: {id: deleteIdMovie.id}})  
      .catch(err => {
        if(!err.statusCode){
          err.statusCode = 500;
        }
        err.message = err;
        next(err);
      });
    }

    Recent.create({
      userId: idUser,
      movieId: idMovie
    })
    .then(recent => {
      res.status(200).json({data: recent});
    })
    .catch(err => {
      if(!err.statusCode){
        err.statusCode = 500;
      }
      err.message = err;
      next(err);
    })
  }
}

exports.removeRecent = async (req, res, next) => {
  const idRecent = req.params.id;
  const idUser = req.body.idUser;
  let allowRemove = false;
  await Recent.findOne({
    where: {
      id: idRecent
    }
  })
  .then(recent => {
    if(!recent){
      return res.status(404).json({message: 'Not found recent'});
    }
    if(recent.userId !== idUser){
      return res.status(401).json({message: 'You are not authorized.'});
    }
    allowRemove = true;
  })
  if(allowRemove){
    Recent.destroy({
      where:{
        id: idRecent
      }
    })
    .then(recent => {
      return res.status(200).json({data: recent.id, message:'Recent Deleted'});
    })
    .catch(err => {
      if(!err.statusCode){
        err.statusCode = 500;
      }
      err.message = err;
      next(err);
    })
  }
}