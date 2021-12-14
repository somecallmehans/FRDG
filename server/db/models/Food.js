const Sequelize = require('sequelize');
const db = require('../db');

const Foods = db.define("food", {
  foodName: {
    type: Sequelize.STRING,
  },
  expirationTime: {
    type: Sequelize.INTEGER
  },
  dateAdded: {
    type: Sequelize.DATE
  }
})

module.exports = Foods;
