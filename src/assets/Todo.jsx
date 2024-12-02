/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDrag } from "react-dnd";
import { useState } from "react";
import { TodoHook } from "../context/TodoContext";

function Todo({ text, todoIndex, taskIndex, taskId }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const { editTodo, removeTodo, apiRemoveTodo, apiUpdateTodo } = TodoHook();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { todoIndex, taskIndex, fromTaskId: taskId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleEdit = (todoIndex) => {
    setEditIndex(todoIndex);
    setEditText(text);
  };

  const handleSave = (e, todoIndex) => {
    e.preventDefault();
    try {
      const status = apiUpdateTodo(todoIndex, taskId, editText);
      if (status) editTodo(taskIndex, todoIndex, editText);
      setEditIndex(null);
    } catch (error) {
      console.log(`Error in editing Todo ${error}`);
    }
    setEditText("");
  };

  const handleRemoveTodo = () => {
    try {
      const status = apiRemoveTodo(todoIndex, taskId);
      if (status) removeTodo(taskIndex, todoIndex);
    } catch (error) {
      console.log(`Error in deleting todo ${error}`);
    }
  };

  return (
    <div
      key={`todo-Item-${todoIndex}`}
      ref={drag}
      className="flex items-center gap-2 bg-gray-200 p-2 rounded-md"
    >
      {editIndex === todoIndex ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow px-2 py-1 border border-gray-400 rounded-md"
          />
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
            onClick={(e) => handleSave(e, todoIndex)}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span className="flex-grow">{text}</span>
          <button
            className="bg-yellow-400 text-white px-2 py-1 rounded-md"
            onClick={() => handleEdit(todoIndex)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-md"
            onClick={() => handleRemoveTodo()}
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
}

export default Todo;
