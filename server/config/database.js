const Sequelize = require('sequelize');

const sequelize = new Sequelize('netflix','root','', {
  host: 'localhost',
  dialect: 'mysql' 
});


module.exports = sequelize;