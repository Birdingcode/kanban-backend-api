const DataTypes = require("sequelize")
const Application = require("./Application")
const Plan = require("./Plan")
//console.log(User)
module.exports = function (db) {
  const Task = db.define(
    "Task",
    {
      Task_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      Task_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Plan_name: {
        type: DataTypes.STRING,
        references: {
          model: Plan,
          key: "Plan_name"
        }
      },
      App_Acronym: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Application,
          key: "App_Acronym"
        }
      },
      Task_description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Task_notes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Task_state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Open"
      },
      Task_creator: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Task_owner: {
        type: DataTypes.STRING
      },
      Task_createDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "task"
    }
  )

  return Task
}
