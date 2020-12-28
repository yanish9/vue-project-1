<template>
  <div class="note">
   <input @click="showModal = true" type="checkbox" :note-id="note_id" v-model="checkedNotes" v-on:click="checkNote">
    <!-- <input type="checkbox" value="bar" v-model="checkedNotes" v-on:click="checkNote"> -->
   <h2>{{note}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Note',
    data() {
      return { checkedNotes: ['bar'] }
    },
  props: {
    note: String,
    note_id: String
  },
  methods: {    
            checkNote: function (e) { 
                console.log(this.checkedVals,e);
                   }
       
       }
   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.note{
    margin: 10px;
    box-shadow: 0px 4px 5px 0px #46a1e7;
    /* padding: 20px; */
    height: 300px;
    width: 200px;
}

  button{
    margin: 1rem 0;
    width: 30%;

  }


 

</style>
