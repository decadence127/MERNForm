const mongoose = require("mongoose");
require("dotenv").config();

async function dbStart() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}
module.exports = dbStart;
