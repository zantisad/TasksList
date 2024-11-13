import React, { useContext, useRef, useState } from "react";
import { TaskContext } from "../../Context/TaskContext";
import "../ToDoInput/ToDoInput.css";
import { Bounce, ToastContainer, toast } from "react-toastify";

const ToDoInput = () => {
  const { dispatch } = useContext(TaskContext);
  const refInputText = useRef();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const select = useRef();

  const addTask = () => {
    if (refInputText.current.value === "") {
      setError("Campo vacío");
      
      return;
    }
    if (select.current.value === "") {
      setError("Escoge una prioridad");
      toast.success(
        "Debes escoger una prioridad"
      , {
        icon: <i class="bi bi-emoji-frown"></i>,
        autoClose: 2000,
      })
      return;
    }

    toast.success("¡Tarea Agregada correctamente!");

    dispatch({
      type: "SEND_TASK",
      title: refInputText.current.value,
      priority: select.current.value,
    });
    refInputText.current.value = "";
    select.current.value = "";
    setError(""); // Limpia el error después de agregar la tarea
  };

  // Función para limpiar el error cuando el usuario hace clic en el input
  const handleInputClick = () => {
    if (error) setError(""); // Eliminar el error si el usuario empieza a escribir
  };

  // Manejador para detectar la tecla Enter y agregar la tarea
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask(); // Llama a addTask si se presiona Enter
    }
  };

  return (
    <div className="inputAndButton d-flex justify-content-center gap-3">
      <div className="info-addTask">
        <input
          className="inputTask"
          style={error ? { color: "red" } : {}}
          ref={refInputText}
          type="text"
          placeholder={error ? error : "Nueva tarea"}
          onClick={handleInputClick} // Limpiar error cuando se hace clic
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // Detecta la tecla presionada
        />
        <div className="priority d-flex align-items-center py-1">
          <select
            ref={select}
            className="form-select-priority"
            id="selectExample"
          >
            <option value="" disabled selected>
              Prioridad
            </option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>
      <div className="button-addTask">
        <button
          type="button"
          className="btn btn-success"
          disabled={!inputValue}
          onClick={addTask}
        >
          Agregar Tarea
        </button>
      </div>
      <ToastContainer
        position="bottom-center" // Coloca las notificaciones en la parte inferior central
        newestOnTop={true} // Las nuevas notificaciones aparecerán encima de las anteriores
        autoClose={1400} // Tiempo que cada notificación estará visible
        theme="light" // Opcional, puedes usar "dark" o "colored"
        hideProgressBar={true} // Opcional, si no quieres que se muestre la barra de progreso
        transition={Bounce}
      />
    </div>
  );
};

export default ToDoInput;
