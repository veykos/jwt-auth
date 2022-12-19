import React from 'react'
import {useState} from 'react'
import axios from 'axios'

function Signup() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  function handleClick(e) {
    e.preventDefault()
    console.log('Clicked')
    axios.post('http://localhost:8000/auth/signup', {username,password})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  return (
    <div>
    Hello from signup page
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={e => handleClick(e)}>Sign up</button>
      </form>
    </div>
  )

}

export default Signup