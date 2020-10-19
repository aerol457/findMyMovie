const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Movie = sequelize.define('movie',{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rate: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Movie;