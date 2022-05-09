const { Sequelize } = require("../models/Db.js")
const User = require("../models/Db.js").models.User
const UserGroup = require("../models/Db").models.UserGroup

exports.getAllUser = async function (req, res) {
  try {
    let users = await User.findAll()
    res.json(users)
  } catch (e) {
    res.status(500).send(e)
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
    res.status(500).send(e)
  }
}

exports.findRoleAll = async function (req, res) {
  try {
    let usery = await User.findAll({ where: { userID: 7 }, include: [{ model: UserGroup, as: "user_ID" }] })

    //console.log(usery)
    res.json(usery)
  } catch (e) {
    res.status(500).send("Sorry, something went wrong.")
    console.log(e)
  }
}
