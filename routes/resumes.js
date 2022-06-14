const router = require('express').Router()
const connection = require('../models/db-init')
const ResumeUserModel = require('../models/resume')
const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt')
const auth = require('../middlewares/auth')

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await ResumeUserModel.findOne({ where: { username } })

    if (await bCrypt.compare(password, user.password)) {
      const userObj = { username }
      const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET)

      res.json({ user, accessToken })
    } else {
      res.send('Not allowed, wrong password')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})

router.post('/create', auth, (req, res) => {
  //Since the user is already created in database upon connection, this API will update the record
  let loggedInName = req.user.username

  connection
    .sync()
    .then(async () => {
      const updatedUser = await ResumeUserModel.update(
        { data: req.body },
        { where: { username: loggedInName } }
      )
      const resUpdatedUser = await ResumeUserModel.findByPk(updatedUser[0])
      const { username, data } = resUpdatedUser.dataValues
      // const responseToClient = { username, data }

      res
        .status(200)
        .set('Content-Type', 'application/json')
        .json({ username, data })
    })
    .catch((err) => {
        console.log(err)
      res.status(500).json({ err: true, errMsg: 'cannot update the user' })
    })
})

module.exports = router
