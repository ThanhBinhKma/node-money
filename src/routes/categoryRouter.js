const categoryController = require('../app/controllers/CategoryController')
const express = require('express')

const categoryRouter = express.Router()

categoryRouter.post('/store', categoryController.store)

module.exports = categoryRouter
