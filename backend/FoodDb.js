const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
mongoose.set("strictQuery", false);

const mongoURL =
  "mongodb+srv://Gofood:Armaan123@gofoodcluster.jtzkguh.mongodb.net/GoFoodMern?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB Atlas successfully!");

    // Ensure database and collection names match Atlas exact casing
    const fetched_data = mongoose.connection.db.collection("Food_items");
    const data = await fetched_data.find({}).toArray();

    const categoryData = mongoose.connection.db.collection("Food_Category");
    const catData = await categoryData.find({}).toArray();

    global.Food_items = data;
    global.Food_Category = catData;

    console.log(
      `Loaded ${data.length} food items and ${catData.length} categories.`,
    );
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
  }
};

module.exports = mongoDB;
