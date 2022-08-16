<template>
  <a-list-item>
    <a-list-item-meta>
      <template #title>
        <a-checkbox v-on:change="onTodoToggle" v-model:checked="completed">{{
          description
        }}</a-checkbox>
      </template>
    </a-list-item-meta>
    <a-button type="danger" @click="onTodoDelete">Delete</a-button>
  </a-list-item>
</template>

<script setup>
import { defineProps, defineEmits, ref, } from 'vue';

const props = defineProps({
  id: String,
  description: String,
  completed: Boolean
})

const emit = defineEmits(['toggleTodo', 'deleteTodo']);
const completed = ref(props.completed);

function onTodoToggle() {
  emit('toggleTodo', props.id);
}

function onTodoDelete() {
  emit('deleteTodo', props.id);
}
</script>