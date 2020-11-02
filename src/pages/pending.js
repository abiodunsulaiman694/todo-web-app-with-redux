import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import TodoList from "../components/TodoList";
import { useTodosStore } from "../stores/todoStore";

const ImportantPage = () => {
  const {
    todosLoading,
    loadingTodos,
    pendingTodos,
    getAllTodos,
  } = useTodosStore();

  useEffect(() => {
    loadingTodos();
    getAllTodos();
  }, [getAllTodos, loadingTodos]);

  return (
    <div className="todo-list-container">
      <div className="title-section">
        <div className="title">Pending</div>
        <div></div>
      </div>
      {todosLoading ? (
        <div className="loader-div">
          <LoadingOutlined />
        </div>
      ) : (
        <TodoList todos={pendingTodos} />
      )}
    </div>
  );
};

export default ImportantPage;
