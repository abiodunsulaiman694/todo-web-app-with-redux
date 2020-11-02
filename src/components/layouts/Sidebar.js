import React from "react";
import {
  HomeOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useTodosStore } from "../../stores/todoStore";

const Sidebar = () => {
  const {
    numOfCompletedTodos,
    numOfAllTodos,
    numOfImportantTodos,
    numOfPlannedTodos,
    numOfPendingTodos,
  } = useTodosStore();

  return (
    <div className="sidebar">
      <nav aria-label="Lists" role="navigation" className="tasks-sidebar">
        <Link to="/" className="task-item-sidebar">
          <div>
            <HomeOutlined className="task-item-sidebar-icon" />
            <span className="task-item-sidebar-text">All Tasks</span>
          </div>
          <span className="task-item-sidebar-count">
            {numOfAllTodos !== 0 ? numOfAllTodos : ""}
          </span>
        </Link>
        <Link to="/important" className="task-item-sidebar">
          <div>
            <StarOutlined className="task-item-sidebar-icon" />
            <span className="task-item-sidebar-text">Important</span>
          </div>
          <span className="task-item-sidebar-count">
            {numOfImportantTodos !== 0 ? numOfImportantTodos : ""}
          </span>
        </Link>
        <Link to="/pending" className="task-item-sidebar">
          <div>
            <ClockCircleOutlined className="task-item-sidebar-icon" />
            <span className="task-item-sidebar-text">Pending</span>
          </div>
          <span className="task-item-sidebar-count">
            {numOfPendingTodos !== 0 ? numOfPendingTodos : ""}
          </span>
        </Link>
        <Link to="/completed" className="task-item-sidebar">
          <div>
            <CheckCircleOutlined className="task-item-sidebar-icon" />
            <span className="task-item-sidebar-text">Completed</span>
          </div>
          <span className="task-item-sidebar-count">
            {numOfCompletedTodos !== 0 ? numOfCompletedTodos : ""}
          </span>
        </Link>
        <Link to="/planned" className="task-item-sidebar">
          <div>
            <CalendarOutlined className="task-item-sidebar-icon" />
            <span className="task-item-sidebar-text">Planned</span>
          </div>
          <span className="task-item-sidebar-count">
            {numOfPlannedTodos !== 0 ? numOfPlannedTodos : ""}
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
