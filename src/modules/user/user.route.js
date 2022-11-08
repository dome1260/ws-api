const userController = require('./controllers/user.controller')
const express  = require('express')

const router = express.Router()

router.post('/', userController.createUser)
router.get('/', userController.getAllUser)
router.get('/:id', userController.getOneUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
