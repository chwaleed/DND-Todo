import TodoList from "../models/Todo.model.js";

export const addTodoList = async (request, response) => {
  try {
    const { title } = request.body;

    if (!title) {
      return response.status(400).json({ message: "Enter Title" });
    }

    const result = await TodoList.create({ title, todos: [] });

    return response.status(201).json({
      data: result,
      message: "TodoList Created",
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: `Internal Server Error ${error.message}` });
  }
};

export const getTodoLists = async (request, response) => {
  try {
    const result = await TodoList.find();

    return response
      .status(200)
      .json({ data: result, message: "Request Successful" });
  } catch (error) {
    response
      .status(500)
      .json({ message: `Internal Server Error ${error.message}` });
  }
};

// export const rearrangeTasks = async (request, response) => {
//   const { index1, index2 } = request.body;
//   console.log(`server ${index1} ${index2}`);

//   if (index1 === undefined || index2 === undefined) {
//     return response.status(400).json({ error: "Both indices are required" });
//   }

//   try {
//     const task1 = await TodoList.findOne({ index: index1 });
//     const task2 = await TodoList.findOne({ index: index2 });

//     const tempIndex = task1.index;
//     task1.index = task2.index;
//     task2.index = tempIndex;

//     await task1.save();
//     await task2.save();
//     console.log(`Completed`);

//     response.status(200).json({ message: "Tasks swapped successfully" });
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const rearrangeTasks = async (request, response) => {
  const { fromId, toId } = request.body;

  // Explicitly check for undefined, as index can be 0
  if (toId === undefined || fromId === undefined) {
    return response.status(400).json({ error: "Both indices are required" });
  }

  try {
    const task1 = await TodoList.findById(fromId);
    const task2 = await TodoList.findById(toId);

    const tempIndex = task1.index;
    task1.index = task2.index;
    task2.index = tempIndex;

    await task1.save();
    await task2.save();
    console.log("swapped");

    response.status(200).json({ message: "Tasks swapped successfully" });
  } catch (error) {
    console.error("Error while swapping tasks:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
