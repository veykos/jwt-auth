const jwt = require('jsonwebtoken')

// Require and configure dotenv, which loads environment variables from a .env file
require('dotenv').config();

// Generates a JSON Web Token (JWT) with the given username and a secret stored in the TOKEN_SECRET environment variable
function generateToken(username) {
  return jwt.sign(
    {username}, // payload
    process.env.TOKEN_SECRET, // secret
    {
      expiresIn: 1000*60*60, // token expiration time (1 hour)
      algorithm: 'HS256' // cryptographic algorithm used to sign the token  
    }
  )
}

// Verifies a JWT with the given token and a secret stored in the TOKEN_SECRET environment variable
// Returns the contents of the JWT which were encoded into it
function checkToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET)
}

// Exports the generateToken and checkToken functions for use in other modules
module.exports = {generateToken, checkToken};
