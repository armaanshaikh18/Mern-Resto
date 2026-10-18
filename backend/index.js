const express = require("express");
const mongoDB = require("./FoodDb");

const app = express();
const port = 4200;

const startServer = async () => {
  // Wait for database & global variable initialization
  await mongoDB();

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
  });

  app.use(express.json());
  app.use("/api", require("./routes/User"));
  app.use("/api", require("./routes/DisplayData"));
  app.use("/api", require("./routes/LoginUser"));
  app.use("/api", require("./routes/OrderData"));
  app.use("/api", require("./routes/OrderHistory"));

  app.listen(port, () => {
    console.log(`Connected to server port ${port}`);
  });
};

startServer();
