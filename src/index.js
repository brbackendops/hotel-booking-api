
require('dotenv').config()
const { connect } = require('./database/connect')

const app = require('./app')

const PORT = process.env.PORT || 3000




const server = app.listen(PORT, async () => {
    await connect()
    console.log(`server is listening on http://127.0.0.1:${PORT}`)
});

process.on('SIGTERM', () => {
    console.error("signal received: closing HTTP server")
    server.close(() => {
        console.error("HTTP server is closed")
    })
})

