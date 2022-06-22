const Category = require('../models/Category')

class CategorySchema {
    get(req, res) {
        Category.find({}, (err, categories) => {
            if (err) {
                res.status(400).json({
                    error: err,
                })
            } else {
                res.status(200).json({
                    data: categories,
                })
            }
        })
    }

    store(req, res) {
        const category = new Category()
        category.name = req.body.name
        category
            .save()
            .then((category) => res.status(200).json({ data: category }))
            .catch((err) => res.status(400).json({ error: err }))
    }

    update(req, res) {
        const category = Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            (err, categroy) => {
                if (err) {
                    res.status(400).json({
                        error: err,
                    })
                } else {
                    res.status(200).json({
                        data: categroy,
                    })
                }
            }
        )
    }

    delete(req, res) {
        Category.find({ id: req.params.id }).remove((err, category) => {
            console.log(err)
            console.log(category)
        })
    }
}
module.exports = new CategorySchema()
