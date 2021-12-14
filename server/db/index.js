const db = require("./db");

const User = require("./models/User");
const Foods = require("./models/Food");

User.belongsToMany(Foods, { as: "User", through: "userFood"});
Foods.belongsToMany(User, { as: "Food", through: "userFood"});

module.exports = {
  db,
  models: {
    User,
    Foods
  }
}
