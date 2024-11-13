import React, { createContext, useReducer } from "react";

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SEND_TASK":
      return [...state, { title: action.title, id: state.length, priority: action.priority }];
    case "DELETE_TASK":
      return state.filter((task, index) => index !== action.index);
      case "SET_TASKS": return action.tasks 
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};



