require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')

// Configure NodeJs server
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(fileUpload({
  useTempFiles: true,
}))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))

// Connect to mongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI,
  error => {
    if (error) throw error;
    console.log('Connected to MongoDB')
  }
)

if (process.env.PORT === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

// Set port
const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`)
})
