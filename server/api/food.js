const router = require("express").Router();
const Food = require("../db/models/Food");

//Get all the food for search query
router.get("/", async (req, res, next) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (error) {
    next(error);
  }
})


module.exports = router;
