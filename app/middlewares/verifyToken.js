import { response } from 'express'
import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    const token = req.header('auth-token')
    console.log(token)
    if (!token) return res.status(401).send('Access Denied')

    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (err) {
        return response.status(400).send('Invalid')
    }
}
