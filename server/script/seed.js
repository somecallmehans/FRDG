const { db, models: {
  User, Foods}
} = require("../db");
const UserData = require("./fakeUserData");
const FoodData = require("./fakeFoodData");

require('dotenv').config();

async function seed() {
  await db.sync({force: true});
  console.log("db is synced");
  for(let i = 0; i < UserData.length; i++){
    await User.create({
      name: UserData[i].name,
      email: UserData[i].email,
      password: "123",
    })
  }

  for(let i = 0; i < FoodData.length; i++){
    await Foods.create({
      foodName: FoodData[i].foodName,
      expirationTime: FoodData[i].expirationTime,
      dateAdded: FoodData[i].dataAdded
    })
  }
}

async function runSeed(){
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
