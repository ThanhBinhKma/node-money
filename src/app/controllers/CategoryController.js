const Category = require('../models/Category')

class CategorySchema {
    store(req, res) {
        const category = new Category()
        category.name = req.body.name
        category
            .save()
            .then((category) => res.status(200).json({ data: category }))
            .catch((err) => res.status(400).json({ error: err }))
    }
}
module.exports = new CategorySchema()
