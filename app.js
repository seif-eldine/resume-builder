require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const postsRoute = require('./routes/resumes')

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

// Routes
app.use('/resumes', postsRoute)


// Server bootstrap
app.listen(process.env.PORT || 3000, () => {
  console.log('Server running')
})

module.exports = app