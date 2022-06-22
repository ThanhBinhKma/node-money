const mongoose = require('mongoose')

const RefreshTokenSchema = mongoose.Schema({
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('refreshToken', RefreshTokenSchema)
