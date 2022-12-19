const router = require('express').Router();
const connection = require('../db')
const jwt = require('jsonwebtoken')
const generateToken = require('../util/authFunctions')
const bcrypt = require('bcryptjs')


router.get('/users', (req,res,next) => {
  connection.query(
    'SELECT username FROM users',
    (err,results) => {
      if (err) return console.log(err)
      res.json(results)
    } 
  )
})

router.post('/signup', (req,res,next) => {
  const {username,password} = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPass = bcrypt.hashSync(password, salt)
  connection.query(
    `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPass}')`,
    (err,result) => {
      if (err) return console.log(err)
      res.status(204)
    }
  )
})


module.exports = router