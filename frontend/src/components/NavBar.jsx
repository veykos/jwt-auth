import { Link } from "react-router-dom";
import axios from 'axios'
import React from 'react'

function NavBar() {
  return (
    <div>
      <Link to={'login'}>Login</Link>
      <Link to={'secret'}>Secret page</Link>
      <Link to={'signup'}>Signup</Link>
      <button onClick={e => {
        e.preventDefault();
        axios.post('http://localhost:8000/auth/logout',{},{withCredentials:true})
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }}>Logout and Clear cookie</button>
    </div>
  )
}

export default NavBar