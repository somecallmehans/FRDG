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
    console.log("in the route");
    const user = await User.findByToken(req.headers);
    let userFridge = await User_Food.findAll({
      attributes: ['foodId'],
      where: {
        userId: user.id
      }
    })
    userFridge = userFridge.map(x => x.user_food);
    console.log("User Fridge: ", userFridge)
    res.json(userFridge);
  } catch (error) {
    next(error);
  }
})

router.post("/:foodId", async (req, res, next) => {
  try {
    const dateAdded = new Date();
    const user = await User.findByToken(req.headers);
    const expirationTime = req.body.expirationTime;
    dateAdded.setDate(dateAdded.getDate() + expirationTime)
    //console.log(Object.keys(user.__proto__));
    const data = await user.addFood(req.params.foodId, {
      through: {
        dateExpires: dateAdded
      }
    });
    //res.send(data)
    res.status(201);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
