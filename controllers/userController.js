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
