import React from "react";
import { Empty } from "antd";
import PropTypes from "prop-types";
import Todo from "./Todo";
import "./todos.css";

const TodoList = ({ todos }) => {
  return (
    <div className="todos">
      <div className="tasks">
        {todos && Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => <Todo key={todo._id} todo={todo} />)
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;
