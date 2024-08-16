const mongoose = require("mongoose");

const connectToDB = async (db_url) => {
  try {
    await mongoose.connect(db_url);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectToDB;
