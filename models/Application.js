const DataTypes = require("sequelize")
//console.log(User)
module.exports = function (db) {
  const Application = db.define(
    "Application",
    {
      App_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      App_Description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Rnumber: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      App_permit_toDoList: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      App_permit_Doing: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      App_permit_Done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      App_permit_Create: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "application"
    }
  )

  return Application
}
