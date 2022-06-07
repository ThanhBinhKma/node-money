import express from 'express'
import { login, register } from '../app/controllers/AuthController.js'

const AuthRouter = express.Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)

export default AuthRouter
