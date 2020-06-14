import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           return M.toast({html: "invalid email",classes:"#f44336 red"})
        }
        fetch('/signup',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                    name,
                    password,
                    email
                })
            
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#f44336 red"})
            }else{
                M.toast({html:data.message, classes:"#4caf50 green"})
                history.push('/signin')
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }



  return (
      <div className="mycard ">
          <div className="card auth-card input-field">
              <h2>Pshare</h2>
              <input
                  type='text'
                  placeholder='name'
                  value ={name}
                onChange={(e)=>{
                setName(e.target.value)
                 }}
              />
              <input
                  type='text'
                  placeholder='email'
                  value={email}
                  onChange={(e)=>{
                     setEmail(e.target.value)
                 }}

              />
              <input
                  type='password'
                  placeholder='password'
                  value={password}
                  onChange={(e)=>{
                     setPassword(e.target.value)
                 }}
              />
              <button className="btn waves-effect waves-light #1e88e5 blue darken-1"
              onClick ={PostData}>Signup</button>
              <h5>
                  <Link to='/signin'> Already have an account?</Link>
              </h5>

          </div>
      </div>
  )
}

export default Signup
