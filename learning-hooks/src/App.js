import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import "./App.scss";
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFiltersForm from "./components/PostFiltersForm";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Hello Truong Pham" },
    { id: 2, title: "Goodbye Truong Pham" },
    { id: 3, title: "Truong Pham test" }
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagintaion] = useState({
    _page: 1,
    _limit: 1,
    totalRows: 1
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1
  })

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagintaion(pagination);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message)
      }
    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage
    })
  }

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

  function handleFiltersChange(newFilters) {
    setFilters({
      ...filters,
      title_like: newFilters.searchTerm,
      _page: 1
    });
  }

  return (
    <div className="app">
      <h1>React hooks - Learning</h1>

      <h3>Click to change color box useState</h3>
      <ColorBox />

      <h3>TodoList</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />

      <h3>Get Post List from API</h3>
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
