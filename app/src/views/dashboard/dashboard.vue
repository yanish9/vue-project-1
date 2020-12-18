<template>
  <div class="home">
    <img width="200" alt="Vue logo" src="../../assets/img/logo.svg">
  <DashboardTopSidebar></DashboardTopSidebar>
<div id="dashboard-list">
  <div v-for="item in ToDoItems" :key="item.id">
    <Note label="My ToDo Item" :done="true" :note="item.label"></Note>
  </div>
</div>
  </div>
</template>


<script>

// @ is an alias to /src
import DashboardTopSidebar from '@/components/dashboard/component.top-sidebar.vue';
import Note from '@/components/dashboard/component.notes.vue';
import uniqueId from 'lodash.uniqueid';

export default {
  name: 'dashboard',
  components: {
    DashboardTopSidebar,
    Note
  },
  data() {
    return {
      ToDoItems: [
        { id: uniqueId('todo-'), label: 'Learn Vue', done: false },
        { id: uniqueId('todo-'), label: 'Create a Vue project with the CLI', done: true },
        { id: uniqueId('todo-'), label: 'Have fun', done: true },
        { id: uniqueId('todo-'), label: 'Create a to-do list', done: false },
        { id: uniqueId('todo-'), label: 'Create a to-do list', done: false },
        { id: uniqueId('todo-'), label: 'Create a to-do list', done: false },
        { id: uniqueId('todo-'), label: 'Create a to-do list', done: false }


     ]
    };
  }
}
</script>
<style scoped lang="scss">

#dashboard-list{
display: flex;
}
</style>