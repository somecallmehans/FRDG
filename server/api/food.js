const router = require("express").Router();
const Food = require("../db/models/Food");
const User = require("../db/models/User")

//Get all the food for search query
router.get("/", async (req, res, next) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
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
  } catch (error) {
    next(error)
  }
})

module.exports = router;
