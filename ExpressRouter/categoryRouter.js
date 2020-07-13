const express = require('express')
const router = express.Router()
// Router variables that should match the controller
const { list,create,update,remove } = require ('../ExpressController/categoryController')

// Use whatever method you need (get, post, etc)
router.get('/categories/:userId', list)
router.post('/categories/:userId', create)
router.put('/categories/:userId', update)
router.delete('/categories/:id', remove)

module.exports = router