<template>
  <div class="login">
   <h2>Sign Up</h2>
   
   <div class="login-form-container">
   
   <input id="email_add" placeholder="Email-Address">
   <input id="password" placeholder="Password">
   <input id="repeat-password" placeholder="Repeat Password">
   
   <button>Sign Up</button>

   <div class="signup_alternatives">
         <button>Google</button>
         <button>Facebook</button>
         <button>Twitter</button>
   </div>

   </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  props: {
    msg: String
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

.login-form-container{
  display: flex;
  flex-direction: column;
  width: 50%;
    // margin:0.5rem auto;
  padding: 0 25%;
  align-items: center;
    
  input{
    
    height: 1.5rem;
    border: none;
    border-bottom:2px  black solid; 
    margin: 1rem 0;
    &:focus{
      outline: none;
    }
  }

  button{
    margin: 1rem 0;
    width: 30%;

  }

}
 

</style>
