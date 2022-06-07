import mongoose from 'mongoose'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { response } from 'express'

export function register(req, res) {
    const email = req.body.email

    const checkEmail = User.find(
        { email: email },
        async (err, userWithUser) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    messages: 'Error',
                    error: err,
                })
            } else if (userWithUser.length > 0) {
                console.log(userWithUser)
                res.status(201).json({
                    status: false,
                    messages: 'Email used!',
                })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(req.body.password, salt)
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    name: req.body.name,
                    password: hashPassword,
                })
                return user
                    .save()
                    .then((newUser) => {
                        res.status(200).json({
                            status: true,
                            messages: 'Success',
                            user: newUser,
                        })
                    })
                    .catch((error) => {
                        res.status(500).json({
                            status: false,
                            messages: 'Error',
                            user: error,
                        })
                    })
            }
        }
    )
}

export function login(req, res) {
    const user = User.findOne(
        { email: req.body.email },
        async (err, userQuery) => {
            if (userQuery) {
                const checkPassword = await bcrypt.compare(
                    req.body.password,
                    userQuery.password
                )
                if (checkPassword) {
                    const token = jwt.sign(
                        { _id: userQuery.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: 60 * 60 }
                    )
                    res.header('auth-token', token)
                    return res.status(200).json({
                        status: 'success',
                        message: 'Login Success',
                        token: token,
                    })
                }
            }
        }
    )
}
