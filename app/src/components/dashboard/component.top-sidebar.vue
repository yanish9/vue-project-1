<template>
  <div class="top-sidebar">

    <button>Add +</button>
    <button>Select All</button>
   <!-- <h2>Top sidebar</h2> -->
    
  </div>
</template>

<script>
export default {
  name: 'DashboardTopSidebar',
  props: {
    msg: String,
    
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

.top-sidebar{
    background: blue;
}

</style>
