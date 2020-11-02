import React, { useState, useEffect, useCallback } from "react";
import {
  StarOutlined,
  StarFilled,
  StepForwardOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Input, Modal, Tooltip, Dropdown, Menu, Select } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import generateCalendar from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";
import { useTodosStore } from "../stores/todoStore";
import { useDetail } from "./App";
import useDebounce from "../lib/debounce";
import formatDueDate from "../lib/format-date";

import "./detailbar.css";

const Calendar = generateCalendar(dateFnsGenerateConfig);
const { Option } = Select;
const { SubMenu } = Menu;

const Detailbar = () => {
  const { TextArea } = Input;
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [todoNote, setTodoNote] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [showDetail, setShowDetail, detailTodo, setDetailTodo] = useDetail();
  const { editTodo, deleteTodo } = useTodosStore();

  useEffect(() => {
    const selectedTask = detailTodo && detailTodo.task ? detailTodo.task : "";
    const selPriority =
      detailTodo && detailTodo.priority ? detailTodo.priority : "";
    const selNote = detailTodo && detailTodo.note ? detailTodo.note : "";
    const selDueDate =
      detailTodo && detailTodo.dueDate ? detailTodo.dueDate : "";
    setEditedTodo(selectedTask);
    setSelectedPriority(selPriority);
    setTodoNote(selNote);
    setTodoDate(selDueDate);
  }, [detailTodo]);

  const hideDetail = () => {
    setShowDetail(false);
    setDetailTodo(null);
  };

  const showDeleteModal = () => {
    Modal.confirm({
      title: `Are you sure you want to delete '${detailTodo.task}'?`,
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "Delete",
      cancelText: "Cancel",
      onOk() {
        handleDeleteTodo();
      },
      okButtonProps: {
        className: "delete-todo-btn",
      },
      cancelButtonProps: {
        className: "cancel-delete-todo-btn",
      },
      maskClosable: true,
    });
  };

  const handleDeleteTodo = () => {
    deleteTodo(detailTodo._id);
    hideDetail();
  };

  const handleTodoUpdate = useCallback(
    (originalTodo, key, value) => {
      const todoToUpdate = {
        ...originalTodo,
        [key]: value,
      };
      editTodo(originalTodo._id, todoToUpdate);
    },
    [editTodo],
  );

  const debouncedTodoChange = useDebounce(editedTodo, 500);
  useEffect(() => {
    if (debouncedTodoChange && debouncedTodoChange !== "") {
      handleTodoUpdate(detailTodo, "task", debouncedTodoChange);
    }
  }, [debouncedTodoChange, detailTodo, editTodo, handleTodoUpdate]);

  const debouncedTodoNoteChange = useDebounce(todoNote, 500);
  useEffect(() => {
    if (debouncedTodoNoteChange && debouncedTodoNoteChange !== "") {
      handleTodoUpdate(detailTodo, "note", debouncedTodoNoteChange);
    }
  }, [debouncedTodoNoteChange, detailTodo, editTodo, handleTodoUpdate]);

  const handleDueDateSelect = (value) => {
    let pickedDate = `${value.getFullYear()}-${
      value.getMonth() + 1
    }-${value.getDate()}T00:00:00.000Z`;
    const newDetailTodo = { ...detailTodo, dueDate: pickedDate };
    setDetailTodo(newDetailTodo);
    handleTodoUpdate(detailTodo, "dueDate", pickedDate);
    setMenuVisible(false);
  };

  const handlePriorityChange = (value) => {
    setSelectedPriority(value);
    handleTodoUpdate(detailTodo, "priority", value || null);
  };

  const handleMenuClick = (e) => {
    let pickedDate = null;
    const dsDate = new Date();
    const dsYear = dsDate.getFullYear();
    const dsMonth = dsDate.getMonth() + 1;
    const dsDay = dsDate.getDate();

    const tomorrowMidnight = dsDate.setHours(24, 0, 0, 0);
    const tomorrowDate = new Date(tomorrowMidnight);
    const tomorrowYear = tomorrowDate.getFullYear();
    const tomorrowMonth = tomorrowDate.getMonth() + 1;
    const tomorrowDay = tomorrowDate.getDate();

    if (e.key === "1") {
      pickedDate = `${dsYear}-${dsMonth}-${dsDay}T00:00:00.000Z`;
    } else if (e.key === "2") {
      pickedDate = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}T00:00:00.000Z`;
    }
    if (pickedDate) {
      const newDetailTodo = { ...detailTodo, dueDate: pickedDate };
      setDetailTodo(newDetailTodo);
      handleTodoUpdate(detailTodo, "dueDate", pickedDate);
    }
    setMenuVisible(false);
  };

  const handleMenuVisibleChange = (flag) => {
    setMenuVisible(flag);
  };

  const toggleTodoFavourite = () => {
    const newDetailTodo = { ...detailTodo, important: !detailTodo.important };
    setDetailTodo(newDetailTodo);
    handleTodoUpdate(detailTodo, "important", !detailTodo.important);
  };

  const toggleTodoCompletion = () => {
    const newDetailTodo = { ...detailTodo, completed: !detailTodo.completed };
    setDetailTodo(newDetailTodo);
    handleTodoUpdate(detailTodo, "completed", !detailTodo.completed);
  };

  const dueDateMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item disabled>Due</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">Today</Menu.Item>
      <Menu.Item key="2">Tomorrow</Menu.Item>
      <Menu.Divider />
      <SubMenu title="Pick Date">
        <div className="due-date-calendar">
          <Calendar fullscreen={false} onSelect={handleDueDateSelect} />
        </div>
      </SubMenu>
    </Menu>
  );

  return (
    <>
      {showDetail && detailTodo && (
        <div className="detail-bar">
          <div>
            <div className="detail-bar-title-section">
              {detailTodo.completed ? (
                <Tooltip placement="top" title="Mark todo as incomplete">
                  <button
                    className="detail-comp-icon"
                    onClick={toggleTodoCompletion}
                  ></button>
                </Tooltip>
              ) : (
                <Tooltip placement="top" title="Mark todo as completed">
                  <button
                    className="detail-incomp-icon"
                    onClick={toggleTodoCompletion}
                  ></button>
                </Tooltip>
              )}
              <input
                className="detail-text-input"
                value={editedTodo}
                onChange={(e) => setEditedTodo(e.target.value)}
              />
              {detailTodo.important ? (
                <Tooltip
                  placement="rightTop"
                  title="Mark todo as not important"
                >
                  <button className="detail-fav" onClick={toggleTodoFavourite}>
                    <StarFilled className="detail-star-filled" />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip placement="rightTop" title="Mark todo as important">
                  <button className="detail-fav" onClick={toggleTodoFavourite}>
                    <StarOutlined className="detail-star-empty" />
                  </button>
                </Tooltip>
              )}
            </div>
            <Dropdown
              overlay={dueDateMenu}
              trigger="click"
              onVisibleChange={handleMenuVisibleChange}
              visible={menuVisible}
            >
              <div className="detail-due-date-section">
                <CalendarOutlined />
                {formatDueDate(todoDate)
                  ? formatDueDate(todoDate)
                  : "Add Due Date"}
              </div>
            </Dropdown>
            <div className="detail-due-date-section">
              <TagOutlined />
              <Select
                value={selectedPriority}
                className="detail-due-date-text"
                allowClear
                onChange={handlePriorityChange}
                placeholder="Select Priority"
              >
                <Option value="high">High Priority</Option>
                <Option value="medium">Medium Priority</Option>
                <Option value="low">Low Priority</Option>
              </Select>
            </div>
            <TextArea
              rows={4}
              autoSize
              className="detail-note"
              value={todoNote}
              onChange={(e) => setTodoNote(e.target.value)}
            />
          </div>
          <div className="detail-footer">
            <Tooltip placement="top" title="Hide Detail View">
              <button className="detail-footer-btn" onClick={hideDetail}>
                <StepForwardOutlined />
              </button>
            </Tooltip>
            <span>Created {detailTodo.createdAt.split("T")[0]}</span>
            <Tooltip placement="rightTop" title="Delete Todo">
              <button className="detail-footer-btn" onClick={showDeleteModal}>
                <DeleteOutlined />
              </button>
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
};

export default Detailbar;
