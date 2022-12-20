require('dotenv').config();
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = require('./app');
const authRouter = require('./authRoutes/authRouter')
const PORT = process.env.PORT || 8000;

// Set cors option to allow cross-origin requests and
// Access-Control-Allow-Credentials headers to be also received
const corsOptions = {
  origin: true,
  credentials: true
}
// Setup JSON body parser, cors and cookieParser middlewares
app.use(express.json())
app.use(cors(corsOptions))
// You need this middleware to be able to parse the cookies from requests
app.use(cookieParser())
// Set up our router to receive all requests sent to /auth
app.use('/auth', authRouter)
app.listen(PORT, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});