const express = require('express')
const router = express.Router()
// Router variables that should match the controller
const { list,create,update } = require ('../ExpressController/categoryController')

// Use whatever method you need (get, post, etc)
router.get('/categories/:userId', list)
router.post('/categories/:userId', create)
router.put('/categories/:userId/:catId', update)

module.exports = router