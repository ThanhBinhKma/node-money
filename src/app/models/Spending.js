const mongoose = require('mongoose')

const SpendingSchema = mongoose.Schema({
    money: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    category_id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('Spending', SpendingSchema)
