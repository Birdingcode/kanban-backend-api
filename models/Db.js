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
const Task = require("./Task")(db)

UserGroup.belongsTo(User, { as: "user_ID", foreignKey: "userID" })
User.hasMany(UserGroup, { as: "user_ID", foreignKey: "userID" })

UserGroup.belongsTo(Application, { as: "userApp", foreignKey: "App_id" })
Application.hasMany(UserGroup, { as: "userApp", foreignKey: "App_id" })

Plan.belongsTo(Application, { as: "appPlan", foreignKey: "App_id" })
Application.hasMany(Plan, { as: "appPlan", foreignKey: "App_id" })

Task.belongsTo(Application, { as: "appTask", foreignKey: "App_id" })
Application.hasMany(Task, { as: "appTask", foreignKey: "App_id" })

Task.belongsTo(Plan, { as: "planTask", foreignKey: "Plan_id" })
Plan.hasMany(Task, { as: "planTask", foreignKey: "Plan_id" })

module.exports = db
