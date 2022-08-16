export const MUTATIONS = {
  FETCH_TODOS: 'fetchTodos',
  ADD_TODO: 'addTodo',
  REMOVE_TODO: 'removeTodo',
}

export default {
  fetchTodos(state, todos) {
    if (todos || todos.length) {
      state.todos = [...todos];
    }
  },

  addTodo(state, todo) {
    state.todos.push(todo)
  },

  removeTodo(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
}