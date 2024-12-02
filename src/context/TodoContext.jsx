/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  addTaskUrl,
  addTodoUrl,
  getTasksListUrl,
  removeTodoUrl,
  updateTodoUrl,
  rearrangeTodoUrl,
  rearrangeTaskUrl,
} from "../backendUrl.js";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const storedTasks = await axios.get(getTasksListUrl);
        setTasksList(storedTasks.data.data);
      } catch (error) {
        console.log(`Error in getting taskLists ${error}`);
      }
    })();
  }, []);

  const addTodoList = (task) => {
    const newTask = { title: task, todos: [] };
    const newTasks = [...tasksList, newTask];
    setTasksList(newTasks);
  };

  const addTodo = (index, todoText) => {
    const updationList = [...tasksList];
    updationList[index].todos.push(todoText);
    setTasksList(updationList);
  };

  const removeTodo = (taskIndex, todoIndex) => {
    const updatedTasks = [...tasksList];
    updatedTasks[taskIndex].todos.splice(todoIndex, 1);
    setTasksList(updatedTasks);
  };

  const editTodo = (taskIndex, todoIndex, newText) => {
    const updatedTasksList = [...tasksList];

    updatedTasksList[taskIndex].todos[todoIndex] = newText;
    setTasksList(updatedTasksList);
  };

  const changePositionOfTodo = (fromTask, todoIndex, toTask) => {
    let updatedData = [...tasksList];
    const targetedTodo = updatedData[fromTask].todos.splice(todoIndex, 1)[0];
    updatedData[toTask].todos.push(targetedTodo);

    setTasksList(updatedData);
  };

  const reorderTaskLists = (fromIndex, toIndex) => {
    setTasksList((prevTasks) => {
      const updatedTasks = [...prevTasks];

      const temp = updatedTasks[fromIndex];
      updatedTasks[fromIndex] = updatedTasks[toIndex];
      updatedTasks[toIndex] = temp;
      return updatedTasks;
    });
  };

  const apiAddTask = async (title) => {
    try {
      const response = await axios.post(addTaskUrl, { title });
      return true;
    } catch (error) {
      console.log(`Error in adding task ${error}`);
      return false;
    }
  };

  const apiAddTodo = async (text, taskId) => {
    console.log(text, taskId);
    try {
      const response = await axios.post(addTodoUrl, { text, taskId });
      return true;
    } catch (error) {
      console.log(`Error in adding Todo ${error}`);
      return false;
    }
  };

  const apiRemoveTodo = async (todoIndex, taskId) => {
    try {
      const result = await axios.delete(removeTodoUrl, {
        data: { todoIndex, taskId },
      });
      return true;
    } catch (error) {
      console.log(`Error in deleting todo ${error}`);
      return false;
    }
  };

  const apiUpdateTodo = async (todoIndex, taskId, text) => {
    try {
      const result = await axios.patch(updateTodoUrl, {
        todoIndex,
        taskId,
        text,
      });
      return true;
    } catch (error) {
      console.log(`Error in updating Todo ${error.message}`);
      return false;
    }
  };

  const apiRearrangeTodo = async (fromTaskId, toTaskId, todoIndex) => {
    try {
      const result = await axios.post(rearrangeTodoUrl, {
        fromTaskId,
        toTaskId,
        todoIndex,
      });

      return false;
    } catch (error) {
      console.log(`Error in rearranging todos ${error.message}`);
      return true;
    }
  };

  const apiRearrangTask = async (fromId, toId) => {
    try {
      const result = await axios.post(rearrangeTaskUrl, { fromId, toId });
    } catch (error) {
      console.log(`Error in rearranging taskts ${error.message}`);
    }
  };

  const data = {
    tasksList,
    addTodo,
    removeTodo,
    editTodo,
    addTodoList,
    changePositionOfTodo,
    reorderTaskLists,
    setTasksList,
    apiAddTask,
    apiAddTodo,
    apiRemoveTodo,
    apiUpdateTodo,
    apiRearrangeTodo,
    apiRearrangTask,
  };

  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};

export const TodoHook = () => {
  return useContext(TodoContext);
};
