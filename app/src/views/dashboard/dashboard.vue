<template>
  <div class="home">
    <Modal  :parentData="parentData" @interface="handleFcAfterDateBack"> </Modal>
    <nav> 
     <div>
       
      <button class="btn orange" type="button"><span>Logout</span></button>
     
     </div>
    <!-- <router-link to="/LOGOUT">LOGOUT</router-link> -->
    </nav> 
    <img width="200" alt="Vue logo" src="../../assets/img/logo.svg">
  <DashboardTopSidebar></DashboardTopSidebar>
<div id="dashboard-list">
  <div v-for="item in ToDoItems" :key="item.id">
    <Note label="My ToDo Item" :done="true" :note="item.label" :note_id="item.id" ></Note>
  </div>
</div>

<button :modalState="false" @click="showModal_parent">show modal</button>
    <button @click="thisModal">Modal</button>
  </div>
</template>

 
<script>

// @ is an alias to /src
import DashboardTopSidebar from '@/components/dashboard/component.top-sidebar.vue';
import Note from '@/components/dashboard/component.notes.vue';
import uniqueId from 'lodash.uniqueid';
import Modal from '@/components/common/Modal.vue';


export default {
  name: 'dashboard',
  components: {
    DashboardTopSidebar,
    Note,
    Modal
  },  
  props: {
    showModal: String,
    
  },
  computed: {
    // getHandlers() {
    //     // return {
    //     //     "show":   this.show
    //     // };
    // }
},
watch: {
    showModal: function () {
        this.$emit('increment');
      }
    
  },
  methods: {    

    thisModal(){
      console.log("thismodal", this.parentData)
      if (this.parentData == false)
      this.parentData = true;
      else
      this.parentData = false;
    },
        
     handleFcAfterDateBack (event) {
      console.log('data after child handle: ', event) // get the data after child dealing
      },

    showModal_parent: function () {
         this.showModal = true;
      }
         
          // showModal() {
          // let element = this.$refs.modal.$el
          // console.log(element)
          // // $(element).modal('show')
          // }
        
       
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
     ],
      parentData: false
    };
  }
}
</script>
<style scoped lang="scss">

#dashboard-list{
display: flex;
}

.btn {
  position: relative;

  display: block;
  margin: 30px auto;
  padding: 0;

  overflow: hidden;

  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  
  background-color: #2ecc71;
  color: #ecf0f1;
  
  transition: background-color .3s;
}

.btn:hover, .btn:focus {
  background-color: #27ae60;
}


.btn:active:before {
  width: 120%;
  padding-top: 120%;
  
  transition: width .2s ease-out, padding-top .2s ease-out;
}


.btn.orange {
  background-color: #e67e22;
}

.btn.orange:hover, .btn.orange:focus {
  background-color: #d35400;
}


.btn span {
  display: block;
  padding: 12px 24px;
}
</style>