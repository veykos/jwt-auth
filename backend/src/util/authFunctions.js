const jwt = require('jsonwebtoken')
require('dotenv').config();

function generateToken(username) {
  return jwt.sign(
    username,
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1800s',
      algorithm: 'HS256'  
    }
    )
}


module.exports = generateToken;