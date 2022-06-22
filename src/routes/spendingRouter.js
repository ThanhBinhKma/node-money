const express = require('express')
const SpendingController = require('../app/controllers/SpendingController')

const spendingRouter = express.Router()

spendingRouter.get('/', SpendingController.index)
spendingRouter.post('/', SpendingController.store)

module.exports = spendingRouter
