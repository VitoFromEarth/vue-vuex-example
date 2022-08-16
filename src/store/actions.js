import { message } from 'ant-design-vue';
import apiClient from "@/api/api.client";
import { uuid } from "@/helpers/uuid";
import { MUTATIONS } from './mutations';

export const ACTIONS = {
  ADD_TODO: 'addTodo',
  CREATE_TODO: 'createTodo',
  GET_TODOS: 'getTodos',
  REMOVE_TODO: 'removeTodo',
  TOGGLE_TODO: 'toggleTodo',
  COMPLETE_ALL_TODOS: 'completeAll',
  CLEAR_COMPLETED_TODOS: 'clearCompleted',
}

class Todo {
  id = uuid();
  description = "";
  completed = false;

  constructor({ id, description, completed, }) {
    this.id = id ? id : this.id;
    this.description = description || description.length ? description : this.description;
    this.completed = completed ? completed : this.completed;
  }
}

export default {
  async getTodos({ commit }) {
    const response = await apiClient.get('/todos');
    commit(MUTATIONS.FETCH_TODOS, response.data);
  },

  async addTodo ({ commit }, description) {
    if (!description || !description.length) {
      message.error("Todo can't be empty!!!");
      return;
    }
    const response = await apiClient.post('/todos', new Todo({ description }));
    commit(MUTATIONS.ADD_TODO, response.data);
  },

  async removeTodo({ dispatch }, todoID) {
    await apiClient.delete(`/todos/${todoID}`);
    await dispatch(MUTATIONS.GET_TODOS);
    message.success("Todo removed!");
  },

  async toggleTodo({ commit, state }, todoID) {
    const todo = state.todos.find((todo) => todo.id === todoID);

    if (todo) {
      const response = await apiClient.put(`/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      })
      const updatedTodos = state.todos.map(todo => {
        if (todo.id === todoID) {
          return new Todo(response.data);
        }

        return new Todo(todo);
      })
      commit(MUTATIONS.FETCH_TODOS, updatedTodos);
    }
  },

  async completeAll({ state, commit }) {
    const updatedTodosRequests = state.todos.filter(todo => !todo.completed)
      .map(todo => apiClient.put(`/todos/${todo.id}`, new Todo({
        ...todo,
        completed: true,
      })));

    const response = await Promise.all(updatedTodosRequests);
    const updatedTodos = response.map(resp => new Todo(resp.data));
    commit(MUTATIONS.FETCH_TODOS, updatedTodos);
    message.success("All todos completed!");
  },

  async clearCompleted({ state, commit }) {
    state.todos.filter(todo => todo.completed)
      .forEach(async (todo) => {
        await apiClient.delete(`/todos/${todo.id}`);
        commit(MUTATIONS.REMOVE_TODO, todo);
      });

      message.success("All todos removed!");
  }
}