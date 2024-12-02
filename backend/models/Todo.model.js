import mongoose from "mongoose";

const todolist = new mongoose.Schema({
  title: String,
  todos: [{ type: String }],
});

const TodoList = new mongoose.model("todolist", todolist);

export default TodoList;
