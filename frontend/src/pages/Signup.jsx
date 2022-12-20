import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Signup() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [response, setResponse] = useState(null)
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  function handleClick(e) {
    e.preventDefault()
    // We post the username and password in an object as the "body" of the request
    // we don't need to send cookies now so we omit any configuration
    axios.post(
      'http://localhost:8000/auth/signup',
      {username,password}
      )
    .then(res => {
      setResponse(res)
      console.log(res)
      // we get the response back and if it's 204 which means OK we navigate to the login page
      if (res.status === 204) return navigate('/login')
    })
    .catch(err => {
      // if we get an error we save it in a state and use it later to display to the user
      setError(err)
    })
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
      {/* Conditionally render the error message from the server... here I've hard coded the error message
      because thats the only reason I can get Status 500 from the server :) */}
      {error && error.response.status === 500 && <h3>Username already exists</h3>}
    </div>
  )

}

export default Signup