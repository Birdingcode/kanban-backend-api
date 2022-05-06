const { Sequelize } = require("sequelize")
const dotenv = require("dotenv")
//const UserGroup = require("./UserGroup")

dotenv.config({ path: "./config/config.env" })

const db = new Sequelize("nodelogin", "root", process.env.MYSQLPW, {
  host: "localhost",
  dialect: "mysql"
})

const User = require("./Users.js")(db)
const UserGroup = require("./UserGroup.js")(db)

UserGroup.belongsTo(User, { foreignKey: "userID" })
User.hasMany(UserGroup, { foreignKey: "userID" })

module.exports = db
