const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const { find } = require('../models/User')

class AuthController {
    async register(req, res) {
        const saltRounds = 10

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
                            req.body,
                            process.env.TOKEN_SECRET,
                            {
                                expiresIn:
                                    Math.floor(Date.now() / 1000) + 60 * 60,
                            }
                        )
                        let refresh_token = jwt.sign(
                            req.body,
                            process.env.REFRESH_TOKEN_SECRET
                        )
                        const refreshToken = new RefreshToken({
                            token: refresh_token,
                        })
                        refreshToken.save((err) => {
                            if (err) {
                                console.log(err)
                                res.sendStatus(401)
                            } else {
                                res.status(200).json({
                                    token: token,
                                    expiresIn:
                                        Math.floor(Date.now() / 1000) + 60 * 60,
                                    refresh_token: refresh_token,
                                })
                            }
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

    refresh(req, res) {
        const authorizationHeader = req.headers['authorization']
        const refresh_token = authorizationHeader.split(' ')[1]

        if (!refresh_token) {
            res.sendStatus(401)
        } else {
            RefreshToken.find({ refresh_token }, (err) => {
                if (err) {
                    res.sendStatus(401)
                } else {
                    jwt.verify(
                        refresh_token,
                        process.env.REFRESH_TOKEN_SECRET,
                        (err, data) => {
                            if (err) {
                                res.sendStatus(401)
                            } else {
                                let token = jwt.sign(
                                    {
                                        email: data.email,
                                        password: data.password,
                                    },
                                    process.env.TOKEN_SECRET
                                )
                                res.status(200).json({
                                    token,
                                })
                            }
                        }
                    )
                }
            })
        }
    }

    logout(req, res) {
        const authorizationHeader = req.headers['authorization']
        const refresh_token = authorizationHeader
            ? authorizationHeader.split(' ')[1]
            : null

        if (!refresh_token) {
            res.sendStatus(401)
        } else {
            RefreshToken.findOneAndRemove({ token: refresh_token }, (err) => {
                if (err) {
                    res.status(400).json({
                        error: err,
                    })
                } else {
                    res.sendStatus(200)
                }
            })
        }
    }
}

module.exports = new AuthController()
