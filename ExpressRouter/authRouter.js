const express = require('express')
const router = express.Router()
// Router variables that should match the controller
const { list,show,create,update,remove } = require (
  '../ExpressController/authController'
)

// Use whatever method you need (get, post, etc)
router.get('/users', list)
router.get('/users/:id', show)
router.post('/users', create)
router.put('/users/:id', update)
// router.put('/users/:id/categories', update)
router.delete('/route/:id', remove)

module.exports = router