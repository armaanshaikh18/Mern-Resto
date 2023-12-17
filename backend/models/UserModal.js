let mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

let UserModal = mongoose.model("user", UserSchema);

module.exports = UserModal;   
