const { Sequelize } = require("../models/Db.js")
const db = require("../models/Db.js")
const User = require("../models/Users")

exports.getAllUser = async function (req, res) {
  try {
    let users = await User.findAll()
    res.json(users)
  } catch (e) {
    res.status(500).send("Sorry, something went wrong.")
  }
}

exports.changeStatus = async function (req, res) {
  try {
    const findID = await User.findOne({ where: { userID: req.body.userID } })
    if (findID != null) {
      await findID.update({ status: Sequelize.literal("NOT status") })
      let users = await User.findAll()
      res.json(users)
    }
  } catch (e) {
    res.status(500).send("Sorry, something went wrong.")
  }
}
