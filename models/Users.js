const bcrypt = require("bcryptjs")
const DataTypes = require("sequelize")
const db = require("./Db.js")
const jwt = require("jsonwebtoken")

const User = db.define(
  "User",
  {
    userID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
      //select: false // questionable
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpire: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
)

// Encrypts password before saving
User.beforeCreate(async (user, option) => {
  const salt = await bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(user.password, salt)
})

// Return JSON Web Token
User.prototype.getJwtToken = function () {
  return jwt.sign({ id: this.userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  })
}

// Compare user password with database password
User.prototype.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password)
}

module.exports = User
