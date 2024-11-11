import ToDoInput from "./components/ToDoInput/ToDoInput.jsx";
import ToDoList from "./components/ToDoList/ToDoList";

function App() {
  return (
    <div className="App">
      <div>
        <h1 className="p-3 w-100 text-center">To Do App</h1>
      </div>

      <ToDoInput />
      <ToDoList />
    </div>
  );
}

export default App;
