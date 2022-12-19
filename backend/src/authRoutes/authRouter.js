const router = require('express').Router();
const connection = require('../db')
const jwt = require('jsonwebtoken')
const generateToken = require('../util/authFunctions')
const bcrypt = require('bcryptjs');
const e = require('express');


router.get('/users', (req,res,next) => {
  connection.query(
    'SELECT username FROM users',
    (err,results) => {
      if (err) return console.log(err)
      res.json(results)
    } 
  )
})

router.post('/login', (req,res) => {
  const {username: usernameFromBody, password: passwordFromBody} = req.body;
  connection.query(
    'SELECT * FROM users WHERE username = ?',
    [usernameFromBody],
    (err,result) => {
      if (err) return console.log(err)
      if (result.length === 0) {
        res.status(404).json({error: 'No such user found'})
      }
      const {username,password} = result[0]
      const doesPasswordMatchHash = bcrypt.compareSync(passwordFromBody, password)
      console.log(doesPasswordMatchHash)
      if (doesPasswordMatchHash) {
        const token = generateToken(username)
        res.json(token)
      } else {
        res.status(404).json({error: 'Password incorrect'})
      }
    }
  )
})

router.post('/signup', (req,res) => {
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