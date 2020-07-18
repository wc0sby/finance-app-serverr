// Connect to data (i.e. Model)
const UserModel = require('../DB/authSchema')
const mon = require('mongoose')
const bcrypt = require('bcryptjs')
const {userValidation, loginValidation} = require('./validation')
const jwt = require('jsonwebtoken')


module.exports.list = ((req,res)=>{
  UserModel.find((err, user)=>{
      if (err) return console.error(err)  
      res.json(user)
    })
})

module.exports.show = ((req, res)=>{
  UserModel.findById(req.params.id,(err,user)=>{
    if(err) return console.error(err)
    res.json(user)
  })
})

module.exports.create = (async (req, res)=>{
  //model a new user
  const {error} = userValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  try {
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
      categories: req.body.categories    
    })
  //TODO: check to see if username is unique
    let savedUser = await newUser.save()
    res.json({user: newUser._id})
  } catch (error) {
    res.status(500).send('User already exists '+ error)
  }
})

module.exports.update = (async(req, res)=>{
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  try {
    const currentDate = new Date()
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
      // categories: req.body.categories,
      updated_at: currentDate
    }
    const updatedUser = await UserModel.updateOne({_id:req.params.id},newUser).exec()
    res.send(`Records updated: ${updatedUser.nModified}`)
  } catch (error) {
    res.status(404).send(`user was not updated.  Error: ${error}`)
  }
})

module.exports.login = (async (req, res)=>{
  const {error} = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
    const user = await UserModel.findOne({username: req.body.username})
    if (!user) return res.status(400).send('Email is invalid')
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid Password')

    //Create Token
    const token = jwt.sign({_id: user._id}, process.env.SECRET)
    res.header('auth-token', token).send(token)

})