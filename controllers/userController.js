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

exports.getUserGroup = async function (req, res) {
  const { username } = req.query
  try {
    let userGroup = await UserGroup.findAll({ attributes: ["username", [Sequelize.fn("GROUP_CONCAT", Sequelize.col("role")), "role"]], group: ["username"], where: { username } })
    res.json(userGroup)
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

// exports.getPlan = async function (req, res) {
//   const { App_Acronym } = req.query
//   try {
//     let plan = await Plan.findAll({ where: { App_Acronym } })
//     res.json(plan)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// }

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
    let permission = ""
    const { Task_id, username } = req.query
    // console.log(Task_id)
    const task = await Task.findAll({ where: { Task_id }, include: [{ model: Application, as: "appTask" }] })

    let taskState = task[0].Task_state
    let App_Acronym = task[0].App_Acronym

    let privilege = await Application.findOne({ where: { App_Acronym } })
    // console.log(App_Acronym)
    if (taskState === "Close") {
      res.json({ task, noPermission: true })
      return
    }
    switch (taskState) {
      case "Open":
        permission = "App_permit_Open"
        break
      case "ToDo":
        permission = "App_permit_toDoList"
        break
      case "Doing":
        permission = "App_permit_Doing"
        break
      case "Done":
        permission = "App_permit_Done"
        break
    }

    console.log(privilege.dataValues)
    let matchingPrivilege = privilege.dataValues[permission]
    console.log(matchingPrivilege)
    const noPermission = await UserGroup.findAll({ where: { username: username, role: matchingPrivilege } })
    console.log(noPermission)
    res.json({ task, noPermission: noPermission.length ? false : true })
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

exports.getGroupApp = async function (req, res) {
  //let concatRG = ""
  let concatRGArray = []

  try {
    let role = await GroupName.findAll()
    //console.log(app)
    //console.log(role)

    for (let k = 0; k < role.length; k++) {
      let JSONconcat = { role: role[k].dataValues.role }
      // concatRG += app[k].dataValues.App_Acronym.concat(" - ", role[i].dataValues.role)
      concatRGArray.push(JSONconcat)
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
      let JSONconcat = { role: currGroup[i].dataValues.role }
      // concatRG += app[k].dataValues.App_Acronym.concat(" - ", role[i].dataValues.role)
      concatRGArray.push(JSONconcat)
    }

    await res.json(concatRGArray)
    console.log(concatRGArray)
  } catch (e) {
    res.status(500).send(e)
  }
}
