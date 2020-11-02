import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import TodoList from "../components/TodoList";
import { useTodosStore } from "../stores/todoStore";

const SearchPage = () => {
  const {
    todosLoading,
    loadingTodos,
    searchedTodos,
    searchTodos,
    getAllTodos,
  } = useTodosStore();

  const location = useLocation();
  const searchTerm = location.search.split("=")[1];

  useEffect(() => {
    loadingTodos();
    searchTodos(searchTerm);
    getAllTodos();
  }, [getAllTodos, loadingTodos, searchTerm, searchTodos]);

  return (
    <div className="todo-list-container">
      <div className="title-section">
        <div className="title">Searching</div>
        <div></div>
      </div>
      {todosLoading ? (
        <div className="loader-div">
          <LoadingOutlined />
        </div>
      ) : (
        <TodoList todos={searchedTodos} />
      )}
    </div>
  );
};

export default SearchPage;
