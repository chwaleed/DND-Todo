/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Todo from "./assets/Todo";
import { TodoHook } from "./context/TodoContext";
import { useDrop, useDrag } from "react-dnd";

function TaskList({ todo, index }) {
  const [value, setValue] = useState("");
  const {
    addTodo,
    changePositionOfTodo,
    apiAddTodo,
    apiRearrangeTodo,
    reorderTaskLists,
    apiRearrangTask,
  } = TodoHook();
  const ref = useRef(null);

  const handleAddTodo = (e) => {
    e.preventDefault();

    try {
      apiAddTodo(value, todo._id);
      addTodo(index, value);
    } catch (error) {
      console.log(`Error in adding Todo ${error}`);
    }
    setValue("");
  };

  const [, drop] = useDrop({
    accept: "ITEM",
    drop: ({ todoIndex, taskIndex, fromTaskId }) => {
      apiRearrangeTodo(fromTaskId, todo._id, todoIndex);
      changePositionOfTodo(taskIndex, todoIndex, index);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TASKLIST",
    item: () => {
      return { id: todo._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const moveCard = (dragIndex, hoverIndex, fromId, toId) => {
    console.log(`move card ${dragIndex} and ${hoverIndex}`);
    apiRearrangTask(fromId, toId);
    reorderTaskLists(dragIndex, hoverIndex);
  };

  const [{ handlerId }, drop2] = useDrop({
    accept: "TASKLIST",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex, item.id, todo._id);
      // item.index = hoverIndex;
    },
  });

  // const [{ handlerId }, drop2] = useDrop({
  //   accept: "TASKLIST",
  //   collect(monitor) {
  //     return {
  //       handlerId: monitor.getHandlerId(),
  //     };
  //   },
  //   drop(item, monitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index; // The original index of the dragged item
  //     const hoverIndex = index; // The target index where the item is dropped

  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }

  //     moveCard(item.id, hoverIndex);

  //     item.index = hoverIndex;
  //   },
  // });

  drag(drop(drop2(ref)));

  return (
    <div
      ref={ref}
      className="bg-[#F8F8F8] mt-7 px-6  py-4 rounded-lg min-h-[10rem]  "
    >
      <h1 className="text-2xl font-semibold text-gray-500 text-center">
        {todo.title}
      </h1>
      <form onSubmit={handleAddTodo}>
        <div className="flex mt-4 gap-3">
          <input
            type="text"
            placeholder="Type Something..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border-[1px] w-[80%] px-2 h-10 rounded-md  border-gray focus:outline-gray-700 focus:outline-dashed"
          />
          <button
            type="submit"
            className="bg-green-400 text-white font-semibold  p-2 rounded-lg"
          >
            Add Task
          </button>
        </div>
      </form>
      <div className="mt-3 flex  flex-col gap-3 text-xl ">
        {todo.todos.map((text, todoIndex) => (
          <Todo
            todoIndex={todoIndex}
            taskIndex={index}
            text={text}
            taskId={todo._id}
            key={`todo-${todoIndex}`}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
