let express = require("express");
let router = express.Router();

router.post("/foodItems", (req, res) => {
  try {
    // console.log('first', global.Food_items)
    res.send([global.Food_items, global.Food_Category]);
  } catch (error) {
    // console.log('first', error.message)
    res.send("Server Error");
  }
});

module.exports = router;
