import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useTodosStore } from "../stores/todoStore";

const Homepage = () => {
  const { todosLoading, loadingTodos, todos, getAllTodos } = useTodosStore();

  useEffect(() => {
    loadingTodos();
    getAllTodos();
  }, [getAllTodos, loadingTodos]);

  return (
    <div className="todo-list-container">
      <div className="title-section">
        <div className="title">Todos</div>
        <div></div>
      </div>
      <AddTodo />

      {todosLoading ? (
        <div className="loader-div">
          <LoadingOutlined />
        </div>
      ) : (
        <TodoList todos={todos} />
      )}
    </div>
  );
};

export default Homepage;
