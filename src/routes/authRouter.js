const express = require('express')
const AuthController = require('../app/controllers/AuthController')

const authRouter = express.Router()

authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)

module.exports = authRouter
