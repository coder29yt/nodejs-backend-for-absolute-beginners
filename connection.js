const mongoose = require("mongoose");

// PLEASE ENTER YOUR OWN CONNECTION URI HERE, DONT USE MINE 
const MONGO_URI ="mongodb+srv://rajpadval145:rajpadval145@cluster0.hbvhhwg.mongodb.net/todolist?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to DB⚡");
};

module.exports = connectDB;
