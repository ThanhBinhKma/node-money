const express = require('express')
const dotenv = require('dotenv')
const database = require('./database/config')
const bodyParser = require('body-parser')

// Router
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const categoryRouter = require('./routes/categoryRouter')

dotenv.config()
database.connect

const app = express()

app.use(bodyParser.json())

app.use('/api/users/', userRouter)
app.use('/api/auth/', authRouter)
app.use('/api/category/', categoryRouter)

app.listen(process.env.PORT)
