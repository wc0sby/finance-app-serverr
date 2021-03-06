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
      }else{
        res.status(404).send(`${res.statusCode} User was not found`) //send an error
      }
    })
    
  } catch (error) {
    res.status(500).send(`${res.statusCode} Server experienced an error: ${error}`)
  }
})

module.exports.create = (async(req, res)=>{
    await UserCategory.findById(req.params.userId,async(err,results)=>{
      try {
        if(results){
          const {categories} = results //deconstruct categories from result
          const newCategories = [...categories] //shallow copy array
          const dupCheck = newCategories.findIndex(i=>i.category === req.body.categories.category)
          if (dupCheck === -1){ //no duplicated categories allowed.  
            newCategories.push(req.body.categories) //add new object
            results.categories = newCategories //set categories eq to new array
            const modifiedUser = await results.save()
            res.json(modifiedUser)
          }else{
            res.send('Duplications are not allowed')
          }
        }else throw error 
        
      } catch (error) {
        res.send('User does not exist')
      }
    })

})

//TODO: make a call to update the categories
module.exports.update = ((req, res)=>res.json({theId: req.params.id}))

module.exports.remove = ((req, res)=>res.json({}))