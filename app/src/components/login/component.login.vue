<template>
  <div class="login">
   <h2>Login</h2>
   
   <div class="login-form-container">
   <notifications position="top center" group="foo" />

   <form  @submit.prevent="login_"> 
     
   <input id="email_add" placeholder="Email-Address" name="sign_in_email">
   <input id="password" placeholder="Password" name="sign_in_password">

   
  <input type="submit" value="Sign In" />    
   </form>
   
   
   
   </div>
  </div>
</template>

<script>

import axios from "axios"; 
import router from "../../router" 
import Vue from 'vue'

export default {
 name: 'Login',  
//  data  : {
//    'from' : 0
//  },
  mounted:function(){
    if (this.$route.query.from == 'su'){
        Vue.notify({
          group: 'foo',
          title: 'Sign up complete',
          text: 'You can now sign in using your credentials'
        })

    }
  console.log(this.$route.query.from)   //method1 will execute at pageload
  },  
        methods: {    
            login_: (e) => {    
                e.preventDefault()        
                let config = {
                              headers: {
                                'content-type': 'application/json' 
                              }
                            };    
                let email = e.target.elements.sign_in_email.value 
                let password = e.target.elements.sign_in_password.value 
                let login_ = () => {    
                    let data = {    
                        email_address: email,    
                        password: password    
                    }    
                    axios.post("/api/login", data, config)
                        .then((response) => {    
                          
                            console.log(response.data)   
                          if (response.data.success == 1){
                            console.log("Logged in")    
                            router.push("/dashboard") }
                            else   {
                              console.log("Error login :", response.data.message); 
                            } 
                        })    
                        .catch((errors) => {    
                            console.log("Cannot log in")    
                            console.log(errors)    

                        })    
                }    
                login_()    
            }    
        },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login{
  outline: 1px solid red;

}

form{

  input{
    display: block;
  }
}


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
