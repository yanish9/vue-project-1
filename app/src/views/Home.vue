<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.svg">
    <Home msg="Welcome to My Notes App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'

export default {
  name: 'home',
  components: {
    Home
  }
}
</script>
