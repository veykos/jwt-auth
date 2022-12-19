const router = require('express').Router();

router.post('/login', (req,res,next) => {
  res.send('hello')
})

router.post('/signup', (req,res,next) => {
  res.send('hello')
})


module.exports = router