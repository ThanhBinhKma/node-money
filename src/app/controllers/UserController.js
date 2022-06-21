const User = require('../models/User')

class UserController {
    index(req, res) {
        User.find({}, (err, users) => {
            if (err) {
                res.status(400).json({
                    message: error,
                })
            } else {
                res.status(200).json({
                    data: users,
                })
            }
        })
    }

    post(req, res) {
        console.log(req)
    }
}

module.exports = new UserController()
