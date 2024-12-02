/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { TodoHook } from "./context/TodoContext";
import TaskList from "./TaskList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";

function App() {
  const [task, setTask] = useState();
  const { addTodoList, tasksList, setTasksList, apiAddTask } = TodoHook();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      apiAddTask(task);
      addTodoList(task);
    } catch (error) {
      console.log(`Error in adding Task ${error}`);
    }
    setTask("");
  };

  return (
    <div>
      <div className="bg-[#F8F8F8] mt-7 flex flex-col justify-center items-center gap-3 w-[20%] rounded-lg h-[10rem] mx-auto">
        <input
          type="text"
          placeholder="Type Something..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border-[1px] w-[80%] px-2 h-10 rounded-md  border-gray focus:outline-gray-700 focus:outline-dashed"
        />
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-green-400 text-white font-semibold  p-2 rounded-lg"
        >
          Create Task List
        </button>
      </div>

      <div className="flex  items-start flex-wrap gap-4 ml-12">
        {tasksList.map((todo, index) => (
          <div className="w-[27%]" key={`TaskWrapper${index}`}>
            <TaskList todo={todo} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
