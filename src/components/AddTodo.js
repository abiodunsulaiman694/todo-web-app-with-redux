import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useTodosStore } from "../stores/todoStore";
import "./add-todo.css";

const AddTodo = () => {
  const [newTask, setNewTask] = useState("");

  const { addTodo } = useTodosStore();
  const onSubmit = (e) => {
    e.preventDefault();

    if (newTask === "") {
      return;
    }
    addTodo({ task: newTask });
    setNewTask("");
  };

  return (
    <div>
      <div className="addToTop">
        <div className="baseAdd">
          <button className="baseAdd-icon">
            <PlusOutlined />
          </button>
          <form onSubmit={onSubmit}>
            <input
              value={newTask}
              className="baseAdd-input"
              onChange={(e) => setNewTask(e.target.value.trim())}
              placeholder="Add a Task"
            />
          </form>
        </div>
        {/* <div>
          <span className="add-todo-div-title">Add a task</span>
        </div> */}
      </div>
    </div>
  );
};

export default AddTodo;
