const User = require('../models/User')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const { find } = require('../models/User')

class AuthController {
    async register(req, res) {
        const saltRounds = 10
        const myPlaintextPassword = 'binhbih'
        const someOtherPlaintextPassword = 'not_bacon'

        const password = await bcrypt.hash(req.body.password, saltRounds)
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: password,
        })
        user.save()
            .then((user) => res.status(200).json({ data: user }))
            .catch((err) => res.status(400).json({ error: err }))
    }

    login(req, res) {
        const user = User.findOne(
            { email: req.body.email },
            async (err, user) => {
                if (err) {
                    res.status(400).json({
                        error: error,
                    })
                } else if (!user) {
                    res.status(400).json({
                        error: 'Email or Password not correct',
                    })
                } else {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let token = jwt.sign(
                            {
                                data: user.email,
                            },
                            process.env.TOKEN_SECRET
                        )
                        let refresh_token = jwt.sign(
                            {
                                data: user.email,
                            },
                            process.env.REFRESH_TOKEN_SECRET
                        )
                        res.status(200).json({
                            token: token,
                            refresh_token: refresh_token,
                        })
                    } else {
                        res.status(400).json({
                            error: 'Email or Password not correct',
                        })
                    }
                }
            }
        )
    }
}

module.exports = new AuthController()
