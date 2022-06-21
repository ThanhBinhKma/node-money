const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/node-money')
        console.log('Connect Success')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connect()
