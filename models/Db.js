const { Sequelize } = require("sequelize")
const dotenv = require("dotenv")

dotenv.config({ path: "./config/config.env" })

module.exports = new Sequelize("nodelogin", "root", process.env.MYSQLPW, {
  host: "localhost",
  dialect: "mysql"
})
