import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { createSelector } from "reselect";
import {
  addTodo,
  getAllTodos,
  editTodo,
  deleteTodo,
  loadingTodos,
  searchTodos,
} from "../actions/todosActions";

const selectCompletedTodos = createSelector(
  (state) => state.todoReducer.todos,
  (allTodos) => allTodos.filter((todo) => todo.completed),
);
const selectPendingTodos = createSelector(
  (state) => state.todoReducer.todos,
  (allTodos) => allTodos.filter((todo) => !todo.completed),
);
const selectImportantTodos = createSelector(
  (state) => state.todoReducer.todos,
  (allTodos) => allTodos.filter((todo) => todo.important),
);
const selectPlannedTodos = createSelector(
  (state) => state.todoReducer.todos,
  (allTodos) => allTodos.filter((todo) => todo.dueDate && todo.dueDate !== ""),
);

export const useTodosStore = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    return state.todoReducer.todos;
  });
  const searchedTodos = useSelector((state) => {
    return state.todoReducer.searchedTodos;
  });
  const todosLoading = useSelector((state) => {
    return state.todoReducer.todosLoading;
  });

  const importantTodos = useSelector(selectImportantTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const plannedTodos = useSelector(selectPlannedTodos);
  const pendingTodos = useSelector(selectPendingTodos);
  const _addTodo = useCallback((data) => dispatch(addTodo(data)), [dispatch]);
  const _editTodo = useCallback((id, data) => dispatch(editTodo(id, data)), [
    dispatch,
  ]);
  const _deleteTodo = useCallback((id) => dispatch(deleteTodo(id)), [dispatch]);
  const _searchTodos = useCallback((id) => dispatch(searchTodos(id)), [
    dispatch,
  ]);
  const _getAllTodos = useCallback(() => dispatch(getAllTodos()), [dispatch]);
  const _loadingTodos = useCallback(() => dispatch(loadingTodos()), [dispatch]);

  return {
    todosLoading,
    todos,
    numOfAllTodos: todos.length,
    getAllTodos: _getAllTodos,
    addTodo: _addTodo,
    editTodo: _editTodo,
    deleteTodo: _deleteTodo,
    loadingTodos: _loadingTodos,
    importantTodos,
    numOfImportantTodos: importantTodos.length,
    completedTodos,
    numOfCompletedTodos: completedTodos.length,
    pendingTodos,
    numOfPendingTodos: pendingTodos.length,
    plannedTodos,
    numOfPlannedTodos: plannedTodos.length,
    searchTodos: _searchTodos,
    searchedTodos,
  };
};
