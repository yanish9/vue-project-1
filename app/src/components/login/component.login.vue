<template>
  <div class="login">
   <h2>Login</h2>
   
   <div class="login-form-container">
   
   <form  @submit.prevent="login"> 
   <input id="email_add" placeholder="Email-Address">
   <input id="password" placeholder="Password">

   
  <input type="submit" value="Sign In" />    
   </form>
   
   
   
   </div>
  </div>
</template>

<script>

import axios from "axios"; 
import router from "../../router" 

export default {
  name: 'Login',   
        methods: {    
            login: (e) => {    
                 e.preventDefault()        
                let config = {
                              headers: {
                                'content-type': 'application/json' ,
                                'Access-Control-Allow-Origin': '*'
                              }
                            };     
                let email = "user@email.com"   
                let password = "passwordmko"    

                let login = () => {    
                    let data = {    
                        email: email,    
                        password: password    
                    }    
                    axios.post("/api/login", data, config)    
                        .then((response) => {    
                            console.log("Logged in")    
                            console.log(response)
                            router.push("/dashboard")    
                        })    
                        .catch((errors) => {    
                            console.log(errors)

                            console.log("Cannot log in")    
                        })    
                }    
                login()    
            }    
        },
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
