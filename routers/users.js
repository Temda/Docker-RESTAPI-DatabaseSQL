const express = require('express')
const router = express.Router()

const userController  = require('../controller/users')


router.get('/user-all', userController.getUsersAll)
router.get('/user-byid/:id', userController.getUsersById)
router.post('/user-create', userController.createUsers)
router.put('/user-update/:id', userController.updateUsers)
router.delete('/user-delete/:id', userController.deleteUsers)

module.exports = router