require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

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
    console.error(err.stack)
    return res.status(500).json({
        status: "error",
        message: "server broken due to something",
        error: err.stack,
    })
})


module.exports = app