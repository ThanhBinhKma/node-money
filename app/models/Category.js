import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        required: true,
    },
})

export default mongoose.model('Category', categorySchema)
