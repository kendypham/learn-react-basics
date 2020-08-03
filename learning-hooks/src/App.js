import React, { useState } from "react";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Hello Truong Pham" },
    { id: 2, title: "Goodbye Truong Pham" },
    { id: 3, title: "Truong Pham test" }
  ]);

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValue) {
    // add new todo to current to list
    const newTodoList = [...todoList];
    const newTodo = {
      id: newTodoList[newTodoList.length - 1].id + 1,
      ...formValue
    }
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>React hooks - Learning</h1>

      <h3>Click to change color box useState</h3>
      <ColorBox />

      <h3>TodoList</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  );
}

export default App;
