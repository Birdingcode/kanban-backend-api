const DataTypes = require("sequelize")
const User = require("./Users.js")
const Application = require("./Application")
const GroupName = require("./GroupName")
//console.log(User)
module.exports = function (db) {
  const UserGroup = db.define(
    "UserGroup",
    {
      user_group_app: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: User,
          key: "username"
        }
      },
      App_Acronym: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: Application,
          key: "App_Acronym"
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: GroupName,
          key: "role"
        }
      }
    },
    {
      timestamps: false,
      tableName: "user_group"
    }
  )

  return UserGroup
}
