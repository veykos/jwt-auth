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


module.exports = generateToken;