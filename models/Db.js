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

User.hasMany(UserGroup, { as: "usergrp", foreignKey: "username" })
UserGroup.belongsTo(User, { as: "usergrp", foreignKey: "username" })

UserGroup.belongsTo(Application, { as: "userApp", foreignKey: "App_Acronym" })
Application.hasMany(UserGroup, { as: "userApp", foreignKey: "App_Acronym" })

Plan.belongsTo(Application, { as: "appPlan", foreignKey: "App_Acronym" })
Application.hasMany(Plan, { as: "appPlan", foreignKey: "App_Acronym" })

Task.belongsTo(Application, { as: "appTask", foreignKey: "App_Acronym" })
Application.hasMany(Task, { as: "appTask", foreignKey: "App_Acronym" })

Task.belongsTo(Plan, { as: "planTask", foreignKey: "Plan_id" })
Plan.hasMany(Task, { as: "planTask", foreignKey: "Plan_id" })

module.exports = db
