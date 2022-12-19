import { Link } from "react-router-dom";

import React from 'react'

function NavBar() {
  return (
    <div>
      <Link to={'login'}>Login</Link>
      <Link to={'secret'}>Secret page</Link>
      <Link to={'signup'}>Signup</Link>
    </div>
  )
}

export default NavBar