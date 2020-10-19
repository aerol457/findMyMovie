const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const userMovie = sequelize.define('usermovie', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idMovie: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = userMovie;