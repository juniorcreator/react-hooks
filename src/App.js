import React, { useState, useEffect } from "react";
import { Context } from "./Context";
import TodoList from "./TodoList";

export default function App() {
  let [todos, setTodos] = useState([]);
  let [todoTitle, setTodoTitle] = useState("");
  let handleClick = () => console.log("clicked");

  useEffect(() => {
    let items = localStorage.getItem("todos") || [];
    setTodos(items.length > 0 ? JSON.parse(items) : []);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    localStorage.setItem("todos", JSON.stringify(todos));
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [todos]);

  let addToto = event => {
    if (event.key === "Enter") {
      console.log("clicked enter");
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: todoTitle,
          completed: false
        }
      ]);
      setTodoTitle("");
    }
  };
  let rmTodo = id => {
    setTodos(todos.filter(item => item.id !== id));
  };
  let toggleTodo = id => {
    console.log("toggleTodo");
    setTodos(
      todos.map(item => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      })
    );
  };

  return (
    <Context.Provider value={{ rmTodo, toggleTodo }}>
      <div className="container">
        <h1>Todo hooks, use localstorage</h1>
        <div className="input-field">
          <input
            type="text"
            onChange={event => setTodoTitle(event.target.value)}
            onKeyPress={addToto}
            value={todoTitle}
          />
          <label>Todo name</label>
        </div>
        <TodoList todos={todos} />
      </div>
    </Context.Provider>
  );
}
