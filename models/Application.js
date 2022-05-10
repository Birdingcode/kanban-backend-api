const DataTypes = require("sequelize")
//console.log(User)
module.exports = function (db) {
  const Application = db.define(
    "Application",
    {
      App_Acronym: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      App_Description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      App_Rnumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      App_startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      App_endDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      App_permit_Open: {
        type: DataTypes.STRING,
        allowNull: false
      },
      App_permit_toDoList: {
        type: DataTypes.STRING,
        allowNull: false
      },
      App_permit_Doing: {
        type: DataTypes.STRING,
        allowNull: false
      },
      App_permit_Done: {
        type: DataTypes.STRING,
        allowNull: false
      },
      App_permit_Close: {
        type: DataTypes.STRING,
        allowNull: false
      },
      App_permit_Create: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "application",
      timestamps: false
    }
  )

  return Application
}
