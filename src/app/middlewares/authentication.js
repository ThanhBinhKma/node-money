const jwt = require('jsonwebtoken')

const authenToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null

    if (!token) {
        res.sendStatus(401)
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if (err) {
                console.log(err)
                res.sendStatus(401)
            } else {
                next()
            }
        })
    }
}

module.exports = authenToken
