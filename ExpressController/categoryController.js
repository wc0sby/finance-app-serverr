// Connect to data (i.e. Model)
const UserCategory = require('../DB/authSchema')
// const Category = require('../DB/categorySchema')

module.exports.list = (async(req,res)=>{
//Returns the user subdoc: Categories
//Return a specific user's categories that are active
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
//Expects: the user id and category id in the url request
//Body will accept updates from the body for category and isActive key
module.exports.update = (async(req, res)=>{
    await UserCategory.findById(req.params.userId,async(err,results)=>{
      try {
        const {categories} = results //deconstruct categories from result
        const newCategories = [...categories] //shallow copy array
        const category = newCategories.find(i=>i._id == req.params.catId)
        // const prevCategory = JSON.parse(JSON.stringify(category))
        
        category.category = req.body.categories.category,
        category.isActive = req.body.categories.isActive 
        
        const savedCategory = await results.save()
        res.json(savedCategory)
      } catch (error) {
        res.send(`There was an error while attempting to update categories. Message: ${error}`)
      }
    })
  })
