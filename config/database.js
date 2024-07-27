const { Sequelize } = require('sequelize');

// can be move to env, for simplicity purpose its visible here
const sequelize = new Sequelize('ecommerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
