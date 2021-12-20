const Sequelize = require('sequelize');
const db = require('../db');

const User_Foods = db.define("user_food", {
  dateExpires: {
    type: Sequelize.DATE
  },
  addedFoodName: {
    type: Sequelize.STRING
  }
})

module.exports = User_Foods
