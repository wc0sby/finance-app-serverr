const jwt = require('jsonwebtoken')

const verify = (req, res, next) =>{
  const token = req.header('auth-token')
  if (!token) return res.status(401).send('Access Denied')

  try {
    const verified = jwt.verify(token, process.env.SECRET)
    //get user from token and set key in req
    req.user = verified
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}

module.exports.verify = verify

//import this module as middleware anytime you need to protect the route