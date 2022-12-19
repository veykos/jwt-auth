const jwt = require('jsonwebtoken')
require('dotenv').config();

function generateToken(username) {
  return jwt.sign(
    {username},
    process.env.TOKEN_SECRET,
    {
      expiresIn: 1000*60*60,
      algorithm: 'HS256'  
    }
    )
}

function checkToken(token) {
  return jwt.verify(token,process.env.TOKEN_SECRET)
}


module.exports = {generateToken, checkToken};