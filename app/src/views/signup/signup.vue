<template>
  <div class="home">
    <img width="200" alt="Vue logo" src="../../assets/img/logo.svg">
  <Signup></Signup>
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from '@/components/signup/component.signup.vue'

export default {
  name: 'signup',
  components: {
    Signup
  }
}
</script>

<style scoped lang="scss">



</style>