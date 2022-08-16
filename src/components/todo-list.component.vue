<template>
  <a-divider />
  <div class="planned-block ">
    <b>Planned</b>
    <a-button @click="completeAllTodos">Complete All</a-button>
  </div>
  <a-list item-layout="horizontal" :data-source="todos">
    <template #renderItem="{ item }">
      <TodoItem
        :key="item.id"
        :id="item.id"
        :description="item.description"
        :completed="item.completed"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
      />
    </template>
  </a-list>
  <a-divider />
  <div class="planned-block ">
    <b>Completed</b>
    <a-button danger @click="clearAllTodos">Clear All</a-button>
  </div>
   <a-list item-layout="horizontal" :data-source="todosCompleted">
    <template #renderItem="{ item }">
      <TodoItem
        :key="item.id"
        :id="item.id"
        :description="item.description"
        :completed="item.completed"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
      />
    </template>
  </a-list>
</template>

<script setup>
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { ACTIONS } from '@/store/actions';
import TodoItem from '@/components/todo-item.component';

const store = useStore();
const todos = computed(() => store.state.todos.filter(todo => !todo.completed));
const todosCompleted = computed(() => store.state.todos.filter(todo => todo.completed));

function toggleTodo(todoID) {
  store.dispatch(ACTIONS.TOGGLE_TODO, todoID);
}

function completeAllTodos() {
  store.dispatch(ACTIONS.COMPLETE_ALL_TODOS);
}

function deleteTodo(todoID) {
  store.dispatch(ACTIONS.REMOVE_TODO, todoID);
}

function clearAllTodos() {
  store.dispatch(ACTIONS.CLEAR_COMPLETED_TODOS);
}

onMounted(() => {
  store.dispatch(ACTIONS.GET_TODOS);
});

</script>

<style>
  .planned-block, .completed-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>