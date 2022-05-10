const { Sequelize } = require("../models/Db.js")
const User = require("../models/Db.js").models.User
const UserGroup = require("../models/Db").models.UserGroup
const Application = require("../models/Db").models.Application

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
    const findID = await User.findOne({ where: { username: req.body.username } })
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
    let usery = await User.findAll({ where: { username: "test2" }, include: [{ model: UserGroup, as: "usergrp" }] })

    //console.log(usery)
    res.json(usery)
  } catch (e) {
    res.status(500).send("Sorry, something went wrong.")
    console.log(e)
  }
}

exports.getApp = async function (req, res) {
  try {
    let app = await Application.findAll()
    res.json(app)
  } catch (e) {
    res.status(500).send(e)
  }
}
