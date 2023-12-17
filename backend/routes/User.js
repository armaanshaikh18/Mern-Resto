let express = require("express");
let router = express.Router();
let Joi = require("joi");
let bcrypt = require("bcrypt");
let UserModal = require("../models/UserModal");

router.post("/createUser", async (req, res) => {
  let { error } = validateUser(req.body);
  if (error) {
    return res.status(403).send(error.details[0].message);
  }

  let newuser = new UserModal({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  let salt = await bcrypt.genSalt(10);
  newuser.password = await bcrypt.hash(newuser.password, salt);
  let saveuser = await newuser.save();
  res.send({ message: "User Created Successfully", u: saveuser });
});

function validateUser(error) {
  let schema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3).max(20),
  });
  return schema.validate(error);
}

module.exports = router;
