import React from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import { useTodosStore } from "../stores/todoStore";
import "./todo.css";
import { useDetail } from "./App";

const Todo = ({ todo }) => {
  const [, setShowDetail, detailTodo, setDetailTodo] = useDetail();
  const { editTodo } = useTodosStore();

  const updateDetail = (task) => {
    setShowDetail(true);
    setDetailTodo(task);
  };

  const handleTodoUpdate = (originalTodo, key, value) => {
    const todoToUpdate = {
      ...originalTodo,
      [key]: value,
    };
    editTodo(originalTodo._id, todoToUpdate);
  };

  const toggleTodoFavourite = () => {
    const newDetailTodo = { ...todo, important: !todo.important };
    setDetailTodo(newDetailTodo);
    handleTodoUpdate(todo, "important", !todo.important);
  };

  const toggleTodoCompletion = () => {
    const newDetailTodo = { ...todo, completed: !todo.completed };
    setDetailTodo(newDetailTodo);
    handleTodoUpdate(todo, "completed", !todo.completed);
  };

  return (
    <div
      className={`todo-container ${
        todo._id === detailTodo?._id ? "active" : ""
      }`}
    >
      <div className="todo">
        {todo.completed ? (
          <Tooltip placement="top" title="Mark todo as incomplete">
            <button
              className="todo-comp-icon"
              onClick={toggleTodoCompletion}
            ></button>
          </Tooltip>
        ) : (
          <Tooltip placement="top" title="Mark todo as completed">
            <button
              className="todo-incomp-icon"
              onClick={toggleTodoCompletion}
            ></button>
          </Tooltip>
        )}
        <button className="todo-text-btn" onClick={() => updateDetail(todo)}>
          {todo.completed ? (
            <del>
              <span>{todo.task}</span>
            </del>
          ) : (
            <span>{todo.task}</span>
          )}
        </button>
        {todo.important ? (
          <Tooltip placement="top" title="Mark todo as not important">
            <button className="todo-fav" onClick={toggleTodoFavourite}>
              <StarFilled className="todo-star-filled" />
            </button>
          </Tooltip>
        ) : (
          <Tooltip placement="top" title="Mark todo as important">
            <button className="todo-fav" onClick={toggleTodoFavourite}>
              <StarOutlined className="todo-star-empty" />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default Todo;
