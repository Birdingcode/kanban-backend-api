const DataTypes = require("sequelize")

module.exports = function (db) {
  const GroupName = db.define(
    "GroupName",
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      }
    },
    {
      timestamps: false,
      tableName: "group_name"
    }
  )

  return GroupName
}
