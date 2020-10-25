const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Recent = sequelize.define('recent',{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = Recent;