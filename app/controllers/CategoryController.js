import mongoose from 'mongoose'
import Category from '../models/Category.js'

export function create(req, res) {
    console.log(req.body)
    const category = new Category({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
    })

    return category
        .save()
        .then((newCategory) => {
            return res.status(201).json({
                success: true,
                message: 'New Category',
                Category: newCategory,
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: false,
                message: 'error',
                error: error,
            })
        })
}

export function get(req, res) {
    Category.find()
        .select('_id title description')
        .then((categories) => {
            return res.status(200).json({
                success: true,
                message: 'List Category',
                Category: categories,
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: 'Error',
                Error: err,
            })
        })
}

export function show(req, res) {
    const id = req.params.id
    console.log(id)
    Category.findById(id)
        .then((category) => {
            return res.status(200).json({
                success: true,
                message: 'Category',
                Category: category,
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: 'Error',
                Error: err,
            })
        })
}

export function update(req, res) {
    const id = req.params.id
    const updateObject = req.body
    Category.update({ _id: id }, { $set: updateObject })
        .exec()
        .then((category) => {
            return res.status(200).json({
                success: true,
                message: 'Update Success',
                Category: updateObject,
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: 'Error',
                Error: err,
            })
        })
}

export function remove(req, res) {
    const id = req.params.id
    Category.findByIdAndRemove(id)
        .then(() => {
            return res.status(200).json({
                success: true,
                message: 'Delete Success',
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: 'Error',
                Error: err,
            })
        })
}
