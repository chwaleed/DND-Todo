import TodoList from "../models/Todo.model.js";

export const addTodo = async (request, response) => {
  try {
    const { text, taskId } = request.body;
    if (!text || !taskId) {
      return response.status(400).json({ message: "Missing text or taskId" });
    }

    const result = await TodoList.findByIdAndUpdate(
      taskId,
      { $push: { todos: text } },
      { new: true }
    );

    if (!result) {
      return response.status(404).json({ message: "TodoList not found" });
    }

    return response.status(200).json({
      data: result,
      message: "Todo added successfully",
    });
  } catch (error) {
    response
      .status(500)
      .message({ message: `Internal Server Error ${error.message}` });
  }
};

export const removeTodo = async (request, response) => {
  try {
    const { todoIndex, taskId } = request.body;

    const result = await TodoList.findByIdAndUpdate(
      taskId,
      { $unset: { [`todos.${todoIndex}`]: 1 } },
      { new: true }
    );

    const finalResult = await TodoList.findByIdAndUpdate(
      taskId,
      {
        $pull: { todos: null },
      },
      { new: true }
    );

    if (!result) {
      return response.status(404).json({ message: "TodoList not found" });
    }

    return response.status(200).json({
      data: finalResult,
      message: "Todo removed successfully",
    });
  } catch (error) {
    response
      .status(500)
      .message({ message: `Internal Server Error ${error.message}` });
  }
};

export const updateTodo = async (request, response) => {
  try {
    const { todoIndex, taskId, text } = request.body;
    console.log(todoIndex, taskId, text);
    const result = await TodoList.findByIdAndUpdate(
      taskId,
      { $set: { [`todos.${todoIndex}`]: text } },
      { new: true }
    );

    if (!result) {
      return response.status(404).json({ message: "TodoList not found" });
    }

    return response.status(200).json({
      data: result,
      message: "Todo modifed successfully",
    });
  } catch (error) {
    response
      .status(500)
      .message({ message: `Internal Server Error ${error.message}` });
  }
};

export const rearrangeTodo = async (request, response) => {
  try {
    const { fromTaskId, toTaskId, todoIndex } = request.body;
    const fromTask = await TodoList.findById(fromTaskId);
    const toTask = await TodoList.findById(toTaskId);

    const todoToMove = fromTask.todos[todoIndex];
    fromTask.todos.splice(todoIndex, 1);
    toTask.todos.splice(todoIndex, 0, todoToMove);

    await fromTask.save();
    await toTask.save();

    console.log(fromTask, toTask);

    return response.status(200).json({
      data: { fromTask, toTask },
      message: "Todo rearranged successfully",
    });
  } catch (error) {
    response
      .status(500)
      .message({ message: `Internal Server Error ${error.message}` });
  }
};
