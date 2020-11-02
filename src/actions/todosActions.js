import API from "../lib/api";

export const TODOS_LOADING = "TODOS_LOADING";
export const SEARCH_TODOS = "SEARCH_TODOS";
export const GET_ALL_TODOS = "GET_ALL_TODOS";
export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const ERROR_TODO = "ERROR_TODO";

export function loadingTodos() {
  return {
    type: "TODOS_LOADING",
  };
}

export function getAllTodos() {
  return async function (dispatch) {
    try {
      const todoResponse = await API.get(`todos`);
      const { data } = todoResponse;
      return dispatch({
        type: "GET_ALL_TODOS",
        data: data?.data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR_TODO",
        data: "Error fetching Todos",
      });
    }
  };
}

export function addTodo(todoData) {
  return async function (dispatch) {
    try {
      const todoResponse = await API.post(`todos`, todoData);
      const { data } = todoResponse;
      dispatch(getAllTodos());
      return dispatch({
        type: "ADD_TODO",
        data: data?.data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR_TODO",
        data: "Error adding Todo",
      });
    }
  };
}

export function editTodo(todoId, todoData) {
  return async function (dispatch) {
    try {
      const todoResponse = await API.put(`todos/${todoId}`, todoData);
      const { data } = todoResponse;
      dispatch(getAllTodos());
      return dispatch({
        type: "EDIT_TODO",
        data: data?.data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR_TODO",
        data: "Error updating Todo",
      });
    }
  };
}

export function searchTodos(searchTerm) {
  return async function (dispatch) {
    try {
      const todoResponse = await API.get(`todos/search/${searchTerm}`);
      const { data } = todoResponse;
      return dispatch({
        type: "SEARCH_TODOS",
        data: data?.data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR_TODO",
        data: "Error searching Todo",
      });
    }
  };
}

export function deleteTodo(todoId) {
  return async function (dispatch) {
    try {
      const todoResponse = await API.delete(`todos/${todoId}`);
      const { data } = todoResponse;
      dispatch(getAllTodos());
      return dispatch({
        type: "DELETE_TODO",
        data: data?.data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR_TODO",
        data: "Error deleting Todo",
      });
    }
  };
}
