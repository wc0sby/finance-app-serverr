const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const connect = require('./DB/index.js')
const authRouter = require('./ExpressRouter/authRouter.js')
const categoryRouter = require('./ExpressRouter/categoryRouter.js')

const app = express()
const port = 3001

//use DB index to call connection props
connect.dbConnect()

app.use(parser.json())

app.use(cors())

app.use(authRouter)

app.use(categoryRouter)


app.listen(port, () => console.log(`Listening on port ${port}!`))