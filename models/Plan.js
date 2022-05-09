const DataTypes = require("sequelize")
const Application = require("./Application")
//console.log(User)
module.exports = function (db) {
  const Plan = db.define(
    "Plan",
    {
      Plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      App_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Application,
          key: "App_id"
        }
      },
      Plan_startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Plan_endDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: "plan"
    }
  )

  return Plan
}