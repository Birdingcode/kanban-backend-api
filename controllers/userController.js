const { Sequelize } = require("../models/Db.js")
const GroupName = require("../models/db").models.GroupName
const User = require("../models/Db.js").models.User
const UserGroup = require("../models/Db").models.UserGroup
const Application = require("../models/Db").models.Application
const Plan = require("../models/Db.js").models.Plan
const Task = require("../models/Db.js").models.Task

exports.getAllUser = async function (req, res) {
  try {
    let users = await User.findAll({
      include: [{ model: UserGroup, as: "usergrp" }]
    })
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

exports.getApp = async function (req, res) {
  try {
    let app = await Application.findAll()
    res.json(app)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.getSpecificApp = async function (req, res) {
  try {
    const { App_Acronym } = req.query
    let app = await Application.findAll({ where: { App_Acronym } })
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

exports.getSpecificPlan = async function (req, res) {
  try {
    const { App_Acronym } = req.query
    let plan = await Plan.findAll({ where: { App_Acronym } })
    //console.log(plan)
    res.json(plan)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.getSpecificPlanE = async function (req, res) {
  try {
    const { App_Acronym, Plan_name } = req.query
    let plan = await Plan.findAll({ where: { App_Acronym: App_Acronym, Plan_name: Plan_name } })
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

exports.getSpecificTask = async function (req, res) {
  try {
    const { Task_id } = req.query
    console.log(Task_id)
    let task = await Task.findAll({ where: { Task_id } })

    // To add parse notes

    res.json(task)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.getGroupApp = async function (req, res) {
  //let concatRG = ""
  let concatRGArray = []

  try {
    let app = await Application.findAll({ attributes: ["App_Acronym"] })
    let role = await GroupName.findAll()
    //console.log(app)
    //console.log(role)

    for (let i = 0; i < app.length; i++) {
      for (let k = 0; k < role.length; k++) {
        let JSONconcat = { appAcronym: app[i].dataValues.App_Acronym, role: role[k].dataValues.role }
        // concatRG += app[k].dataValues.App_Acronym.concat(" - ", role[i].dataValues.role)
        concatRGArray.push(JSONconcat)
      }
    }

    await res.json(concatRGArray)
    console.log(concatRGArray)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.getCurrGroup = async function (req, res) {
  const { username } = req.query
  let concatRGArray = []

  try {
    let currGroup = await UserGroup.findAll({ where: { username } })

    //console.log(currGroup)

    for (let i = 0; i < currGroup.length; i++) {
      let JSONconcat = { appAcronym: currGroup[i].dataValues.App_Acronym, role: currGroup[i].dataValues.role }
      // concatRG += app[k].dataValues.App_Acronym.concat(" - ", role[i].dataValues.role)
      concatRGArray.push(JSONconcat)
    }

    await res.json(concatRGArray)
    console.log(concatRGArray)
  } catch (e) {
    res.status(500).send(e)
  }
}
