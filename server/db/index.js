const db = require("./db");

const User = require("./models/User");
const Foods = require("./models/Food");
const User_Foods = require("./models/User_Food");

User.belongsToMany(Foods, { through: User_Foods});
Foods.belongsToMany(User, { through: User_Foods});

module.exports = {
  db,
  models: {
    User,
    Foods,
    User_Foods
  }
}
