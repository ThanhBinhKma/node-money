const express = require('express')
const UserController = require('../app/controllers/UserController')

const userRouter = express.Router()

userRouter.get('/', UserController.index)

module.exports = userRouter
