import { useState } from "react";
import Navbar from "./Navbar";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, settodos] = useState([]);

  useEffect(() => {
    const savedtodos = localStorage.getItem("todos");
    if (savedtodos) {
      settodos(JSON.parse(savedtodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (e, id) => {
    let td = todos.find((item) => item.id == id);
    setTodo(td.todo);
    let newtd = todos.filter((item) => item.id !== id);
    settodos(newtd);
  };

  const handleDelete = (e, id) => {
    let newtodos = todos.filter((item) => item.id !== id);
    settodos(newtodos);
  };

  const handleAdd = () => {
    if (!todo.trim()) return;
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  const handlecheckchange = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-200 p-5 rounded-2xl m-4 h-150">
        <div className="font-bold text-2xl p-2">Add a Todo</div>
        <div className="flex p-2">
          <input
            onChange={handlechange}
            value={todo}
            className="border-1 rounded w-3xl"
            type="text"
          />
          <button
            onClick={handleAdd}
            disabled={todo.trim() === ""}
            className="bg-blue-500 cursor-pointer hover:transition-all hover:scale-105 hover-shadow-lg hover:text-blue-500 hover:bg-white hover:border-1 mx-6 px-4 p-1 font-semibold rounded-md text-sm "
          >
            Add
          </button>
        </div>
        <div>
          <h1 className="text-xl font-bold mt-5 p-2">Your Todo's</h1>
          <div className="flex flex-col  p-2 bg-white rounded-lg shadow-md">
            <div>
              {todos.length === 0 && (
                <div className="text-4xl flex justify-center  text-slate-500 m-2">
                  No tasks to display
                </div>
              )}
            </div>
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex m-3 bg-slate-200 p-3 rounded-lg shadow-md"
                >
                  <input
                    onChange={handlecheckchange}
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="checkbox"
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                  <div className="flex ml-auto">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-blue-500 hover:transition-all hover:shadow-lg hover:scale-105 hover:text-blue-500 hover:bg-white hover:border-1  mx-6 px-4 p-1  font-semibold rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-red-500 mx-6 px-4 p-1 hover:bg-white hover:text-red-500 hover:transition-all hover:duration-300 hover:border-1 font-semibold rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
