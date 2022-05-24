const DataTypes = require("sequelize")
const Application = require("./Application")
//console.log(User)
module.exports = function (db) {
  const Plan = db.define(
    "Plan",
    {
      Plan_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      App_Acronym: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Application,
          key: "App_Acronym"
        }
      },
      Plan_Description: {
        type: DataTypes.STRING,
        allowNull: false
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
      timestamps: false,
      tableName: "plan"
    }
  )

  return Plan
}
