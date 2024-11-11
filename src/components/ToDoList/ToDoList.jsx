import React, { useContext, useState } from "react";
import { TaskContext } from "../../Context/TaskContext";
import "../ToDoList/ToDoList.css";

const ToDoList = () => {
  const { tasks, dispatch } = useContext(TaskContext);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [moveIndex, setMoveIndex] = useState(null);
  const [lastMoveIndex, setLastMoveIndex] = useState(null);

  const handleCheckboxChange = (index) => {
    setTimeout(() => {
      // Verificar si el índice es válido y la tarea no es undefined
      if (index === undefined || !tasks[index]) return;

      const updatedTasks = [...tasks];
      const nowTask = updatedTasks[index];
      updatedTasks[index].completed = !updatedTasks[index].completed;

      // Separar las tareas activas (completed = true) y desactivadas (completed = false)
      const activeTasks = updatedTasks.filter((task) => task && task.completed);
      const inactiveTasks = updatedTasks.filter(
        (task) => task && !task.completed
      );

      // Combinamos las tareas activas con las desactivadas (mantenemos las activas arriba)
      const finalTasks = [...activeTasks, ...inactiveTasks];

      setLastMoveIndex(nowTask.id);

      // Actualizamos el estado global de las tareas
      dispatch({ type: "SET_TASKS", tasks: finalTasks });
    }, 301);
    setTimeout(() => {
      setLastMoveIndex(null);
    }, 1200);
  };

  const moveItemUp = (task, index) => {
    setMoveIndex(index);

    setTimeout(() => {
      const updatedTasks = [...tasks]; // Copia el array de tareas
      const [item] = updatedTasks.splice(index, 1); // Elimina el item en el índice
      updatedTasks.unshift(item); // Agrega el item al principio del array

      // Actualiza el estado con el nuevo array
      dispatch({ type: "SET_TASKS", tasks: updatedTasks });
      setMoveIndex(null);
    }, 300);
  };

  const deleteTask = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      dispatch({ type: "DELETE_TASK", index });
      setDeletingIndex(null);
    }, 300);
  };

  return (
    <div className="mt-4 p-1 d-flex w-100">
      <ul className="list-group w-100">
        {tasks &&
          tasks.map((task, index) => (
            <li
              className={`d-flex justify-content-between align-items-center list-group-item list-group-item-action list-group-item-primary p-0 mb-1 ${
                deletingIndex === index ? "slide-out" : ""
              } ${moveIndex === index ? "slide-out" : ""}
               ${lastMoveIndex === task.id ? "slide-in" : ""}
                `}
              key={index}
            >
              <input
                checked={(task && task.completed) || false} // Verifica si está marcado
                onChange={() => handleCheckboxChange(index)} // Cambia el estado al marcar/desmarcar
                onClick={() => moveItemUp(task, index)} // Mueve el item hacia arriba
                className="form-check-input m-1 mx-2"
                type="checkbox"
                value=""
                id={index}
              />
              <label className="form-check-label p-2 w-100 d-flex justify-content-center text-center" htmlFor={index}>
                {task.title}
              </label>
              <button
                type="button"
                className="btn btn-sm m-2 btn-outline-danger"
                onClick={() => deleteTask(index)}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ToDoList;
