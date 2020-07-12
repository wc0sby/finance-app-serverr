// Connect to data (i.e. Model)
const UserCategory = require('../DB/authSchema')


module.exports.list = (async(req,res)=>{
//Returns the user subdoc: Categories
//Return a specific user's categories
  try {
    await UserCategory.findById(req.params.userId,(err,results)=>{
      if (results){ //if user is found
        const {categories} = results //deconstruct the found user
        const activeCategories = categories.filter(i=>i.isActive) //only want active
        res.json(activeCategories) //send to browser
      }
      res.status(404).send(`${res.statusCode} User was not found`) //send an error
    })
    
  } catch (error) {
    res.status(500).send(`${res.statusCode} Server experienced an error: ${error}`)
    
  }
})

// module.exports.show = ((req, res)=>res.json({theId: req.params.id}))

module.exports.create = ((req, res)=>{

})

module.exports.update = ((req, res)=>res.json({theId: req.params.id}))

module.exports.remove = ((req, res)=>res.json({}))