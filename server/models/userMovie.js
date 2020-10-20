const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const userMovie = sequelize.define('usermovie', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  }
});

module.exports = userMovie;