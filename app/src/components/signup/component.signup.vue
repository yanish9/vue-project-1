<template>
  <div class="login">
   <h2>Sign Up</h2>
   
   <div class="signup_">
     
   <form @submit.prevent="signup_"  > 
   <input value="mko" id="username" placeholder="Username" name="sign_up_username">
   <input value="ops@bstech.io"  id="email_add" placeholder="Email-Address" name="sign_up_email">
   <input   value="ops@.io" id="password" placeholder="Password" name="sign_up_pwd">
   <input   value="ops@.io" id="repeat-password" placeholder="Repeat Password" name="sign_up_rep_pwd">
  
  <input type="submit" value="signup"/>    
   
   </form>

   <div class="signup_alternatives">
         <button>Google</button>
         <button>Facebook</button>
         <button>Twitter</button>
   </div>

   </div>
  </div>
</template>

<script>

import axios from "axios"; 
import router from "../../router" 
export default {
  name: 'Signup',
        methods: {    
            signup_: (e) => {         
               e.preventDefault()        
                let config = {
                              headers: {
                                'content-type': 'application/json' 
                              }
                            };    
                console.log(e)

                let username =  e.target.elements.sign_up_username.value
                let email =  e.target.elements.sign_up_email.value
                let password = e.target.elements.sign_up_pwd.value
                let rep_password = e.target.elements.sign_up_rep_pwd.value
                if (password != rep_password){
                  console.log("password do not match")
                  return;
                }


                let signup_ = () => {    
                    let data = {    
                        username: username,
                        email_address: email,    
                        password: password    
                    }    
                    axios.post("/api/signup", data, config)
                        .then((response) => {    
                          if (response.data.success == 1){
                            console.log("Signed up")    
                            router.push("/login?from=su") 
                            }
                            else   {
                              console.log("Error signup :", response.data.message); 
                            } 
                        })    
                        .catch((errors) => {    
                            console.log("Cannot sign up ")    
                            console.log(errors)    

                        })    
                }    
                signup_()    
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
