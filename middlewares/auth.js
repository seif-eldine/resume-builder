require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['authorization']

  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log("decoded >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:", decoded)
    console.log("dcode func:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", jwt.decode(token))
    req.user = decoded
  } catch (err) {
    // TODO : use loggers to log the caught errors to cloud loggers or server
    return res.status(401).send('Invalid Token')
  }
  return next()
}

module.exports = verifyToken