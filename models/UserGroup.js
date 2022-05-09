const DataTypes = require("sequelize")
const User = require("./Users.js")
const Application = require("./Application")
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
      userID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: User,
          key: "userID"
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
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "user_group"
    }
  )

  return UserGroup
}
