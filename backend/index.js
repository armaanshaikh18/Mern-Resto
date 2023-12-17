let express = require("express");
let mongoose = require("mongoose");
let mongoDB = require("./FoodDb");
mongoDB();
let app = express();
let User = require("./routes/User");
let Display = require("./routes/DisplayData");
let Login = require("./routes/LoginUser");
let Order = require("./routes/OrderData");
let OrderHistory = require("./routes/OrderHistory");
let port = 4200;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", User);
app.use("/api", Display);
app.use("/api", Login);
app.use("/api", Order);
app.use("/api", OrderHistory);

app.get("/", (req, res) => {
  res.send("hello world Armaan!!");
});

// mongoose
//   .connect("mongodb://localhost:27017/GoFoodMern")
//   .then(() => {
//     console.log("Connected To db");
//   })
//   .catch((error) => {
//     console.log("Something Went Wrong", error.message);
//   });

app.listen(port, () => {
  console.log(`Connected to server ${port}`);
});
