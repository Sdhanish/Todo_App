import { useEffect, useState } from "react";
import Lists from "./components/Lists";
import { addTodo, getAllToDo, updateTodo, deleteTodo } from "./utils/HandleApi";

function App() {
  const [toDos, setToDos] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDos);
  }, []);

  const handleAddTodo = () => {
    if (text.trim() === "") {
      alert("Todo cannot be empty");
      return;
    }
    addTodo({ text, setText, setTodos: setToDos });
  };

  const handleUpdateTodo = () => {
    if (text.trim() === "") {
      alert("Todo cannot be empty");
      return;
    }
    console.log("Updating:", { toDoId, text });
    updateTodo({ toDoId, text, setToDos, setText, setIsUpdating });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (isUpdating) {
        handleUpdateTodo();
      } else {
        handleAddTodo();
      }
    }
  };

  const updateMode = (_id, text) => {
    console.log("Entering edit mode with:", { _id, text });
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add your todo list here.."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          <div
            onClick={isUpdating ? handleUpdateTodo : handleAddTodo}
            className="add"
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDos.map((item) => (
            <Lists
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteTodo={() => deleteTodo({ _id: item._id, setToDos })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
