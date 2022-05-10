const bcrypt = require("bcryptjs")
const DataTypes = require("sequelize")
const jwt = require("jsonwebtoken")

module.exports = function (db) {
  const User = db.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      timestamps: false,
      tableName: "accounts"
    }
  )

  // Encrypts password before saving
  User.beforeCreate(async (user, option) => {
    const salt = await bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(user.password, salt)
  })

  User.beforeSave(async (user, option) => {
    const salt = await bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(user.password, salt)
  })

  // Return JSON Web Token
  User.prototype.getJwtToken = function () {
    return jwt.sign({ id: this.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
    })
  }

  // Compare user password with database password
  User.prototype.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
  }
  return User
}
