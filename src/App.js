import Header from "./components/Header/Header.jsx";
import ToDoInput from "./components/ToDoInput/ToDoInput.jsx";
import ToDoList from "./components/ToDoList/ToDoList";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Header/> 
      <ToDoInput />
      <ToDoList />
    </div>
  );
}

export default App;
