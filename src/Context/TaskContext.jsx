import React, { createContext, useReducer } from "react";

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  console.log("entrando en taskReducer");
  switch (action.type) {
    case "SEND_TASK":
      return [...state, { title: action.title, id: state.length }];
    case "DELETE_TASK":
      console.log("DeleteOption");
      return state.filter((task, index) => index !== action.index);
      case "SET_TASKS": return action.tasks 
    default:
      console.log("default");
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

