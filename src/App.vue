<template>
  <a-layout class="layout">
    <a-layout-header class="header">Todo Application</a-layout-header>
    <a-layout-content class="content">
      <a-input-group compact>
        <a-input
          placeholder="Write todo text"
          @press-enter="addNewTodo"
          v-model:value="todoDescriptioin"
          style="width: calc(100% - 60px)"
        />
        <a-button @click="addNewTodo" type="primary">Add</a-button>
      </a-input-group>
      <TodoList />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import 'ant-design-vue/dist/antd.css';
import TodoList from '@/components/todo-list.component.vue';

const todoDescriptioin = ref("");
const store = useStore();
function addNewTodo() {
  store.dispatch('addTodo', todoDescriptioin.value);
}

</script>

<style>
.header {
  color: #fff;
  padding: 0 24px;
}
.content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .content {
  background: #141414;
}
</style>