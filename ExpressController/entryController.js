// Connect to data (i.e. Model)
const UserEntry = require('../DB/authSchema')
// const Category = require('../DB/categorySchema')

module.exports.list = (async(req,res)=>{
//Returns the user subdoc: Categories
//Return a specific user's categories that are active
const {_id} = req.user
  try {
    await UserEntry.findById(_id,(err,results)=>{
      if (results){ //if user is found
        const {entries} = results //deconstruct the found user
        const activeEntries = entries.filter(i=>i.isActive) //only want active
        res.json(activeEntries) //send to browser
      }else{
        res.status(404).send(`${res.statusCode} User was not found`) //send an error
      }
    })
    
  } catch (error) {
    res.status(500).send(`${res.statusCode} Server experienced an error: ${error}`)
  }
})

module.exports.create = (async(req, res)=>{
    await UserEntry.findById(req.params.userId,async(err,results)=>{
      try {
        if(results){
          const {entries} = results //deconstruct entries from result
          const newentries = [...entries] //shallow copy array
          // const dupCheck = newentries.findIndex(i=>i.entries === req.body.entries.category)
          // if (dupCheck === -1){ //no duplicated entries allowed.  
            newentries.push(req.body.entries) //add new object
            results.entries = newentries //set categories eq to new array
            const modifiedUser = await results.save()
            res.json(modifiedUser)
          // }else{
            // res.send('Duplications are not allowed')
          // }
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
    await UserEntry.findById(req.params.userId,async(err,results)=>{
      try {
        const {entries} = results //deconstruct entries from result
        const newentries = [...entries] //shallow copy array
        const entry = newentries.find(i=>i._id == req.params.catId)
        // const preventry = JSON.parse(JSON.stringify(entry))
        
        entry.category = req.body.entries.category,
        entry.isActive = req.body.entries.isActive 
        
        const savedEntry = await results.save()
        res.json(savedEntry)
      } catch (error) {
        res.send(`There was an error while attempting to update categories. Message: ${error}`)
      }
    })
  })
