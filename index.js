import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import CategoryRouter from './routes/category.js'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))

const port = process.env.PORT

// Connect DB
mongoose
    .connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected')
    })
    .catch((error) => {
        console.log('Error connecting to database')
    })

//  Router

app.use('/api/category/', CategoryRouter)

app.listen(port, () => {
    console.log(port)
})
