let mongoose = require("mongoose");

let mongoURL = "mongodb://localhost:27017/GoFoodMern";
// "mongodb+srv://Gofood:Armaan123@atlascluster.96ttpnt.mongodb.net/goFoodMern?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURL,

    async (err) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("Connected To db");
        const fetched_data = await mongoose.connection.db.collection(
          "Food_items"
        );
        fetched_data.find({}).toArray(async (err, data) => {
          const categoryData = await mongoose.connection.db.collection(
            "Food_Category"
          );

          categoryData.find({}).toArray((err, catData) => {
            if (err) console.log("Error", err);
            else {
              global.Food_items = data;
              global.Food_Category = catData;
              // console.log("data", data);
            }
          });
        });
      }
    }
  );
};

module.exports = mongoDB;
