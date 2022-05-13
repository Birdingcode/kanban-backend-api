const { Sequelize } = require("../models/Db.js")
const User = require("../models/Db.js").models.User
const UserGroup = require("../models/Db").models.UserGroup
const Application = require("../models/Db").models.Application
const Plan = require("../models/Db.js").models.Plan
const Task = require("../models/Db.js").models.Task

exports.getAllUser = async function (req, res) {
  try {
    let users = await User.findAll({ include: [{ model: UserGroup, as: "usergrp" }] })
    res.json(users)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.changeStatus = async function (req, res) {
  try {
    const findID = await User.findOne({ where: { username: req.body.username }, include: [{ model: UserGroup, as: "usergrp" }] })
    if (findID != null) {
      await findID.update({ status: Sequelize.literal("NOT status") })
      let users = await User.findAll({ include: [{ model: UserGroup, as: "usergrp" }] })
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

exports.getPlan = async function (req, res) {
  try {
    let plan = await Plan.findAll()
    res.json(plan)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.getTask = async function (req, res) {
  try {
    const { App_Acronym } = req.query
    console.log(req.query)
    let task = await Task.findAll({ where: { App_Acronym } })
    res.json(task)
  } catch (e) {
    res.status(500).send(e)
  }
}
