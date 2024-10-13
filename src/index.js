
require('dotenv').config()
const { connect } = require('./database/connect')

const app = require('./app')

const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    await connect()
    console.log(`server is listening on http://127.0.0.1:${PORT}`)
})