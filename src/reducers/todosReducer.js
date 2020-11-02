import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  ERROR_TODO,
  TODOS_LOADING,
  GET_ALL_TODOS,
  SEARCH_TODOS,
} from "../actions/todosActions";

const initialState = {
  newTodo: {},
  todos: [],
  searchedTodos: [],
  message: "",
  status: "",
  todosLoading: false,
};

const todos = (state = initialState, action = {}) => {
  const { type, data } = action;
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        newTodo: data,
        message: "Todo created successfully",
        status: "success",
      };
    case EDIT_TODO:
      return {
        ...state,
        newTodo: data,
        message: "Todo updated successfully",
        status: "success",
      };
    case DELETE_TODO:
      return {
        ...state,
        message: "Todo deleted successfully",
        status: "success",
      };
    case GET_ALL_TODOS:
      return {
        ...state,
        todos: data,
        todosLoading: false,
        message: "Todos loaded successfully",
        status: "success",
      };
    case SEARCH_TODOS:
      return {
        ...state,
        searchedTodos: data,
        todosLoading: false,
        message: "Todos loaded successfully",
        status: "success",
      };
    case TODOS_LOADING:
      return {
        ...state,
        todosLoading: true,
        message: "",
        status: "",
      };
    case ERROR_TODO:
      return {
        ...state,
        status: "error",
        message: data,
      };
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    default:
      return state;
  }
};

export default todos;
