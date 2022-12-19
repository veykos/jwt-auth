import React from 'react'

function Signup() {
  function handleClick(e) {
    e.preventDefault()
    console.log('Clicked')
  }
  return (
    <div>
    Hello from signup page
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button onClick={e => handleClick(e)}>Sign up</button>
      </form>
    </div>
  )

}

export default Signup