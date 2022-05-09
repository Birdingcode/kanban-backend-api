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
const Application = require("./Application")(db)
const Plan = require("./Plan")(db)

//UserGroup.belongsTo(Application, { as: "app_ID", foreignKey: "App_id" })
UserGroup.belongsTo(User, { as: "user_ID", foreignKey: "userID" })
User.hasMany(UserGroup, { as: "user_ID", foreignKey: "userID" })
//Application.hasMany(Plan, {foreignKey:"App_id"})
//Application.hasMany(Plan, {foreignKey:"App_id"})

module.exports = db
