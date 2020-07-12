// Connect to data (i.e. Model)
const UserModel = require('../DB/authSchema')
const mon = require('mongoose')

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
  try {
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      categories: req.body.categories    
    })
  //TODO: check to see if username is unique
    let savedUser = await newUser.save()
    res.json(savedUser)
  } catch (error) {
    res.status(500).send('User already exists '+ error)
  }
})

module.exports.update = (async(req, res)=>{
  try {
    const currentDate = new Date()
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      // categories: req.body.categories,
      updated_at: currentDate
    }
    const updatedUser = await UserModel.updateOne({_id:req.params.id},newUser).exec()
    res.send(`Records updated: ${updatedUser.nModified}`)
  } catch (error) {
    res.status(404).send('user was not updated')
  }
})

module.exports.remove = ((req, res)=>res.json({}))