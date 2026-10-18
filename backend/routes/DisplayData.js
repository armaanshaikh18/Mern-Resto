const express = require("express");
const router = express.Router();

router.post("/foodItems", (req, res) => {
  try {
    // Send global data or empty array fallback
    const foodItems = global.Food_items || [];
    const foodCategory = global.Food_Category || [];

    res.send([foodItems, foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
