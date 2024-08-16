const { Router } = require("express");
const todoModel = require("../models/todoModel");
const authRole = require("../middlewares/authRole");

const todoRoute = Router();

todoRoute.post("/", authRole("CREATOR"), async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTodo = new todoModel({
      title,
      completed: completed || false,
      createdBy: req.user.id,
    });
    await newTodo.save();
    res
      .status(200)
      .json({ newTodoadded: newTodo, messege: "New Todo added by creator" });
  } catch (err) {
    res
      .status(500)
      .json({ messege: "error while posting new todo", error: err });
  }
});

todoRoute.get(
  "/",
  authRole("VIEWER", "VIEW_ALL", "CREATOR"),
  async (req, res) => {
    let todos;

    try {
      //req.user taking from middleware
      if (req.user.role.includes("VIEW_ALL")) {
        todos = await todoModel.find();
      } else {
        todos = await todoModel.find({ createdBy: req.user.id });
      }
      res.status(200).json({ getTodos: todos });
    } catch (err) {
      res
        .status(500)
        .json({ messege: "error while getting todos", error: err });
    }
  }
);

todoRoute.delete("/:id", authRole("CREATOR"), async (req, res) => {
  const todo = await todoModel.findById(req.params.id);
  // console.log(todo);

  if (todo.createdBy.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ messege: "you cannot delete some one else todo" });
  }
  await todo.deleteOne();
  res.json({ messege: "Todo deleted" });
});

todoRoute.patch("/:id", authRole("CREATOR"), async (req, res) => {
  const { title, completed } = req.body;
  const todo = await todoModel.findById(req.params.id);
  if (todo.createdBy.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ messege: "you cannot edit some one else todo" });
  }
  todo.title = title || todo.title;
  todo.completed = completed || todo.completed;
  await todo.save();
  res.json({ messege: "Todo Updated" });
});

module.exports = todoRoute;
