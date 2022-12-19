require('dotenv').config();
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = require('./app');
const authRouter = require('./authRoutes/authRouter')
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/auth', authRouter)
app.listen(PORT, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});