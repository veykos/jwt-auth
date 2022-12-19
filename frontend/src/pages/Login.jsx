import {useState} from 'react'
import axios from 'axios'
function Login() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')


  function handleClick(e) {
    e.preventDefault()
    const reqBody = {username, password}
    axios.post('http://localhost:8000/auth/login', reqBody, {withCredentials: true})
    .then(res => {
      console.log('have response')
      console.log(res)
    })
    .catch(err => console.log(err))
  }


  return (
    <div>
    Hello from login page
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={e => handleClick(e)}>Log in</button>
      </form>
    </div>
  )
}

export default Login