<template>
  <div class="home">
    <img width="200" alt="Vue logo" src="../../assets/img/logo.svg">
  <Login ></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/login/login.vue'

export default {
  name: 'login',
  components: {
    Login
  }
}
</script>
