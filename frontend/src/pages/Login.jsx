import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
function Login() {
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  function handleClick(e) {
    e.preventDefault()
    // create the body of the request you are sending from the states of the inputs
    const reqBody = {username, password}
    // POST your body to /auth/login and also set the config of axios to withCredentials:true
    // this attaches the cookies to your requests
    axios.post('http://localhost:8000/auth/login', reqBody, {withCredentials: true})
    .then(res => {
      setResponse(res)
      // If we get a status 200 which means the server authenticated us, we navigate the user to /secret
      if (res.status === 200) return navigate('/secret')
    })
    // if we get an error from the server we save it in a state and later we use this state to show
    // the user an error message
    .catch(err => setError(err))
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
      {/* Here we conditionally render the error message that the server sent to us */}
      {error && error.response.data.error && <h3>{error.response.data.error}</h3>}
    </div>
  )
}

export default Login