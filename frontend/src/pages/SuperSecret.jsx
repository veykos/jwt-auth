import React, {useState, useEffect} from 'react'
import axios from 'axios'
function SuperSecret() {
  const [response,setResponse] = useState(null)
  useEffect(() => {
    // useEffect runs on component mount, only once, sends a request to the server to verify the JWT of the user
    // that's why we also specify withCredentials:true ; If the token is good, we get a response back from the server
    // and save it in a state
    axios.get('http://localhost:8000/auth/secret', {withCredentials:true})
    .then(res => setResponse(res))
    .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <h2>Super Secret webpage</h2>
      {/* Conditionally render the secret message along with the username of the user extracted from his JWT token
      The whole decrypted token is sent back, this is only for demonstration purposes now, but you can also
      send parts of the token.
      Remember, the token should never hold sensitive data, even hashed passwords are not allowed, but
      any information you might want to use on the front end is good to go.  */}
      {response && response.data.message && <h3>{response.data.message}</h3>}
      {response && response.data.username && <div>
        <h3>Your username is {response.data.username}</h3>
        <h4>This is a secret message only logged in users can see</h4>
        <h4>You are amazing, keep doing what you are doing ❤️</h4>
      </div>}
    </div>
  )
}

export default SuperSecret