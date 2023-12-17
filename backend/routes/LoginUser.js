let express = require("express");
let router = express.Router();
let Joi = require("joi");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let UserModal = require("../models/UserModal");

// const secretKey = "MynameisArmaanShaikhReactJsDeveloper#1";

router.post("/loginUser", async (req, res) => {
  let { error } = validateEmail(req.body);
  if (error) {
    return res.status(403).send(error.details[0].message);
  }
  let email = req.body.email;
  let userData = await UserModal.findOne({ email });
  if (!userData) {
    return res
      .status(401)
      .send({ message: "Plaese Enter Valid Credentials email" });
  }
  const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
  if (!pwdCompare) {
    return res
      .status(403)
      .send({ message: "Please Enter Valid Credentials pass" });
  }

  let auth = jwt.sign({ id: userData.id }, "APP_KEY");
  return res.send({
    message: "Logged In User Success",
    log: userData,
    authToken: auth,
  });
  // let salt = await bcrypt.genSalt(10);
  // newuser.password = await bcrypt.hash(newuser.password, salt);
  // let saveuser = await newuser.save();
  // res.send({ message: "User Created Successfully", u: saveuser });
});

function validateEmail(error) {
  let schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3).max(20),
  });
  return schema.validate(error);
}

module.exports = router;
