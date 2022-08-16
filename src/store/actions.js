import { message } from 'ant-design-vue';
import apiClient from "@/api/api.client";
import { uuid } from "@/helpers/uuid";

const createTodo = ({ description = "", completed = false }) => ({
  id: uuid(),
  description,
  completed,
})

export default {
  async getTodos({ commit }) {
    const response = await apiClient.get('/todos');
    commit('fetchTodos', response.data);
  },

  async addTodo ({ commit }, description) {
    if (!description || !description.length) {
      message.error("Todo can't be empty!!!");
      return;
    }
    const response = await apiClient.post('/todos', createTodo({ description }));
    commit('addTodo', response.data);
  },

  async removeTodo({ dispatch }, todoID) {
    await apiClient.delete(`/todos/${todoID}`);
    await dispatch('getTodos');
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
          return response.data;
        }

        return todo;
      })
      commit('fetchTodos', updatedTodos);
    }
  },

  async completeAll({ state, commit }) {
    const updatedTodos = state.todos.map(async (todo) => {
      if (!todo.completed) {
        await apiClient.put(`/todos/${todo.id}`, {
          ...todo,
          completed: true,
        })
      }

      return todo;
    });

    commit('fetchTodos', updatedTodos);
    message.success("All todos completed!");
  },

  async clearCompleted({ state, commit }) {
    state.todos.filter(todo => todo.completed)
      .forEach(async (todo) => {
        await apiClient.delete(`/todos/${todo.id}`);
        commit('removeTodo', todo);
      });

      message.success("All todos removed!");
  }
}