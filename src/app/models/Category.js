const mongoose = require('mongoose')
const { schema } = require('./User')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model('Category', CategorySchema)
