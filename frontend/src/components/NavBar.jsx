import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import React from 'react'

function NavBar() {
  const navigate = useNavigate()
  function handleClick(e) {
    // This function sends a logout request to the server, sending back an empty body but attaching the
    // cookies through withCredentials config. If the returned status is 204 OK, then we navigate the user
    // back to login page
      e.preventDefault();
      axios.post('http://localhost:8000/auth/logout',{},{withCredentials:true})
      .then(res => {
        if (res.status === 204) {
          return navigate('/login')}
      })
      .catch(err => console.log(err))
    }
  return (
    <div>
      <Link to={'login'}>Login</Link>
      <Link to={'secret'}>Secret page</Link>
      <Link to={'signup'}>Signup</Link>
      <button onClick={e => handleClick(e)}>Logout and Clear cookie</button>
    </div>
  )
}

export default NavBar