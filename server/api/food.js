const router = require("express").Router();
const Food = require("../db/models/Food");
const User = require("../db/models/User")
const User_Food = require("../db/models/User_Food");

//Get all the food for search query
router.get("/", async (req, res, next) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (error) {
    next(error);
  }
})

router.get("/userFridge", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers);
    let fridgeIds = await User_Food.findAll({
      attributes: ['foodId', 'dateExpires', 'addedFoodName'],
      where: {
        userId: user.id
      }
    })/* .then((item) => item.map(x => x.foodId)); */
    console.log("IDS: ", fridgeIds);

/*
    let userFridge = await fridgeIds.map(async (x) => await Food.findOne({
      where: {
        id: x
      }
    }))
    userFridge = await Promise.all(userFridge); */
    //userFridge = userFridge.map(x => x.foodId);
    //res.json(userFridge);
  } catch (error) {
    next(error);
  }
})

router.post("/:foodId", async (req, res, next) => {
  try {
    const dateAdded = new Date();
    const user = await User.findByToken(req.headers);
    const expirationTime = req.body.expirationTime;
    const foodName = req.body.foodName;
    dateAdded.setDate(dateAdded.getDate() + expirationTime)
    //console.log(Object.keys(user.__proto__));
    const data = await user.addFood(req.params.foodId, {
      through: {
        dateExpires: dateAdded,
        addedFoodName: foodName
      }
    });
    //res.send(data)
    res.status(201);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
