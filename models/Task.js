const DataTypes = require("sequelize")
const Application = require("./Application")
const Plan = require("./Plan")
//console.log(User)
module.exports = function (db) {
  const Task = db.define(
    "Task",
    {
      Task_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      Plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Plan,
          key: "Plan_id"
        }
      },
      App_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Application,
          key: "App_id"
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
        allowNull: false
      },
      Task_creator: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Task_owner: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Task_createDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: "task"
    }
  )

  return Task
}
