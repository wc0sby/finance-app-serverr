const express = require('express')
const router = express.Router()
const {verify} = require('./verifyToken')
// Router variables that should match the controller
const { list,create,update } = require ('../ExpressController/categoryController')

// Use whatever method you need (get, post, etc)
router.get('/categories/', verify, list)
router.post('/categories/:userId', create)
router.put('/categories/:userId/:catId', update)

module.exports = router