const categoryController = require('../app/controllers/CategoryController')
const express = require('express')

const categoryRouter = express.Router()

categoryRouter.get('/', categoryController.get)
categoryRouter.post('/store', categoryController.store)
categoryRouter.put('/:id', categoryController.update)
categoryRouter.delete('/:id', categoryController.delete)

module.exports = categoryRouter
