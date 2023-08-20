const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    task: String,
    location: String,
  },
  { timestamps: true }
);

const TodoSchema = mongoose.model("todo", todoSchema);
module.exports = TodoSchema;
