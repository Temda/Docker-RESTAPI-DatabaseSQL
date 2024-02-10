const express = require('express')
const router = express.Router()

const userController  = require('../controller/users')


router.get('/user-db', userController.getConnectDabase)
router.get('/user-byid/:id', userController.getUsersById)




module.exports = router