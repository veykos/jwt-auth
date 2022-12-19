const router = require('express').Router();
const connection = require('../db')
const jwt = require('jsonwebtoken')


router.post('/login', (req,res,next) => {
  res.send('hello')
})

router.post('/signup', (req,res,next) => {
  res.send('hello')
})


module.exports = router