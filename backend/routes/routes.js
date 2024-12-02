import { Router } from "express";
import {
  addTodoList,
  getTodoLists,
  rearrangeTasks,
} from "../controllers/handleTodoList.js";
import {
  addTodo,
  rearrangeTodo,
  removeTodo,
  updateTodo,
} from "../controllers/handleTodo.js";

const routes = Router();

routes.post("/create-todolist", addTodoList);
routes.get("/get-todolist", getTodoLists);
routes.post("/rearrange-tasks", rearrangeTasks);

routes.post("/add-todo", addTodo);
routes.delete("/remove-todo", removeTodo);
routes.patch("/update-todo", updateTodo);
routes.post("/rearrange-todo", rearrangeTodo);

export default routes;
