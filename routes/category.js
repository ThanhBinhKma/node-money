import express from 'express'
import {
    create,
    get,
    remove,
    show,
    update,
} from '../app/controllers/CategoryController.js'

const CategoryRouter = express.Router()

// Create
CategoryRouter.post('/', create)

// Get All
CategoryRouter.get('/', get)

// Show
CategoryRouter.get('/:id', show)

//update
CategoryRouter.put('/:id', update)

//Remove
CategoryRouter.delete('/:id', remove)

export default CategoryRouter
