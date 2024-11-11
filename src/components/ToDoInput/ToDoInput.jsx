import React, { useContext, useRef, useState } from "react";
import { TaskContext } from "../../Context/TaskContext";

const ToDoInput = () => {
  const { dispatch } = useContext(TaskContext);
  const refInputText = useRef();
  const [error, setError] = useState("");

  const addTask = () => {
    if (refInputText.current.value === "") {
      setError("Campo vacío");
      return;
    }

    dispatch({
      type: "SEND_TASK",
      title: refInputText.current.value,
    });
    refInputText.current.value = "";
    setError(""); // Limpia el error después de agregar la tarea
  };

   // Función para limpiar el error cuando el usuario hace clic en el input
   const handleInputClick = () => {
    if (error) setError(""); // Eliminar el error si el usuario empieza a escribir
  };

  return (
    <div className="inputAndButton d-flex justify-content-center gap-3">
      <input
      style={error ? { color: "red" } : {}}
        ref={refInputText}
        type="text"
        placeholder={error ? error : "Nueva tarea"}
        onClick={handleInputClick} // Limpiar error cuando se hace clic
      />
      <button type="button" className="btn btn-success" disabled={!refInputText.current?.value} onClick={addTask}>
        Agregar Tarea
      </button>
    </div>
  );
};

export default ToDoInput;
