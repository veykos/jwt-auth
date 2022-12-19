import React, {useState, useEffect} from 'react'
import axios from 'axios'
function SuperSecret() {
  const [response,setResponse] = useState(null)
  useEffect(() => {
    console.log('effect ran')
    axios.get('http://localhost:8000/auth/secret', {withCredentials:true})
    .then(res => setResponse(res))
    .catch(err => console.log(err))
  }, [])
  console.log(response)
  return (
    <div>
      <h2>Super Secret webpage</h2>
      {response && response.data.message && <h3>{response.data.message}</h3>}
      {response && response.data.username && <div>
        <h3>Your username is {response.data.username}</h3>
      </div>}
    </div>
  )
}

export default SuperSecret