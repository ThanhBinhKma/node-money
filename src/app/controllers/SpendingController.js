const Spending = require('../models/Spending')

class SpendingController {
    index(req, res) {}

    store(req, res) {
        const spending = new Spending()
        spending.money = req.body.money
        spending.category_id = req.body.category_id
        spending.save((err, spending) => {
            if (err) {
                res.status(400).json({
                    error: err,
                })
            } else {
                res.status(200).json({
                    spending,
                })
            }
        })
    }

    delete(req, res) {}
}

module.exports = new SpendingController()
