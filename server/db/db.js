const Sequelize = require("sequelize")
//const pkg = require("../package.json")

const databaseName = "frdg"

const config = {
  logging: false,
}

if (process.env.LOGGING === "true") {
  delete config.logging
}

if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, config)
module.exports = db;

