const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./connection");
const TodoSchema = require("./models/TodoSchema");

// mai server ko karunga request aur server mujhe dega response
// reqest ke khuch types hote hai - [get,post,put(update),delete]
// Status code :
//  1xx : Informational
// 2xx: Success
// 3xx: Redirection
// 4xx: Client Error
// 5xx: Server Error

app.use(express.json());
connectDB();

// ROUTE 1 : TO GET DATA
app.get("/", async (req, res) => {
  // FINDING THE DATA
  let posts = await TodoSchema.find();
  res.json(posts);
});

// ROUTE 2 : TO POST DATA
app.post("/api/post-data", async (req, res) => {
  // GRABBING DATA BY DESCRUCTURING
  const { task, location, id } = req.body;
  // the other way is : req.body.*     * - STANDS FOR WHAT YOU WANT TO GET

  // ADDING THE DATA TO THE MODEL
  let post = new TodoSchema({
    task,
    location,
    id,
  });

  // SAVING THE DATA TO THE DATABASE
  await post.save();

  res.json({ success: true, post });
});

// ROUTE 3 : TO DETEL DATA
app.delete("/api/delete-data/:id", async (req, res) => {
  //   const id = req.params.id; OR YOU CAN USE THE FOLLOWING METHOD

  // GRABBING ID FROM THE PARAM.
  const { id } = req.params;

  //GRABBING THE POST AND DELETING
  let post = await TodoSchema.findByIdAndDelete(id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }
  res.json({ message: "Your post has been deleted successfully" });
});

// ROUTE 4 : TO UPDATE DATA
app.put("/api/update-data/:id", async (req, res) => {
  const { task, location } = req.body;
  const { id } = req.params;

  //   GRABBING THE POST
  let post = await TodoSchema.findByIdAndUpdate(id, { task, location });

  // SENDING RESPONSE
  res.json({ message: "Post updated sucessfully", post });
});
app.listen(port, () => {
  console.log("Server running at port 5000");
});
