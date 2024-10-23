require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const HttpException = require('./exceptions/exception')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors()) //development
app.use(cookieParser())


app.get("/health", (req,res) => {
    res.status(200).json({
        "message": "OK"
    })
})

const userRoutes = require('./routes/user_routes');
const hotelRoutes = require('./routes/hotels_routes');

app.use('/v1/users',userRoutes)
app.use('/v1/hotels',hotelRoutes)

// error 
app.use((err,req,res,next) => {
    if (err instanceof HttpException) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.name,
            error: err.message
        })
    }
    return process.env.NODE_ENV === "production" ?
        res.status(500).json({
            status: "error",
            message: "server broken due to something",
            error: "Internal Server Error",
        }): res.status(500).json({
            status: "error",
            message: err.message,
            error: err.stack
        })
})


module.exports = app