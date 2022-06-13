require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const postsRoute = require('./routes/resumes')


// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.use('/resumes', postsRoute)

// app.get('/posts', authenticateToken, (req, res) => {
//   res.json(posts.filter(post => post.username === req.user.name))
// })

// * app.post('/login', (req, res) => {
//   //Authenticate user

//   const username = req.body.username
//   const user = {name: username}

//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//   res.json({accessToken: accessToken})

// * })

// app.post('/users', async (req, res) => {
//   try{
//     const salt = await bCrypt.genSalt()
//     const hashedPassword = await bCrypt.hash(req.body.password, salt)

//     const user = {name: req.body.name, password: hashedPassword}
//     users.push(user)
//     res.status(201).send()
//   }catch{
//     res.status(500).send()
//   }
// })

// app.post('/users/login', async (req, res) => {
//   const user = users.find(user => user.name == req.body.name)
//   if( user == null){
//     return res.status(400).send('Cannot find')

//   }

//   try {
//     if(await bCrypt.compare(req.body.password, user.password)){
//       res.send('Success logged')
//     } else {
//       res.send('Not allowed pass')
//     }
    
//   } catch {
//     res.status(500).send()
//   }
// })

// function authenticateToken(req, res, next){

//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if( token == null ){
//     return res.sendStatus(401)
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)

//     req.user = user
//     next()
//   })
// }

app.listen(process.env.PORT || 3000, () => {
  // try {
  //   await connection.authenticate()
  //   console.log('Connection has been established successfully.')
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error)
  // }
  // await Resume.init()
  console.log('Server running')
})

module.exports = app