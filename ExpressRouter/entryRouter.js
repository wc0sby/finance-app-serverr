const express = require('express')
const router = express.Router()
const {verify} = require('./verifyToken')
// Router variables that should match the controller
const { list, create, update } = require ('../ExpressController/entryController')

// Use whatever method you need (get, post, etc)
router.get('/entries/', verify, list)
router.post('/entries/', verify, create)
router.put('/entries/:userId/:entryId', update)

module.exports = router