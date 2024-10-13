const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL,{
    logging: console.log,
    define: {
        freezeTableName: true
    }
})


module.exports = {
    connect: async () =>{
        try {
            await sequelize.authenticate()
            console.log("database connection was successfull")
            await sequelize.sync({ alter: true , force: true }) /// developement only
            console.log('All models were synchronized successfully');
        } catch (error) {
            console.log("database connection is not successfull")
            console.log(error)
        }
    },
}