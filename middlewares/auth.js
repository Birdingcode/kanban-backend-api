const jwt = require("jsonwebtoken")
const User = require("../models/Db").models.User
const UserGroup = require("../models/Db").models.UserGroup
const GroupName = require("../models/Db").models.GroupName
const Application = require("../models/Db").models.Application
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const Task = require("../models/Db").models.Task
const ErrorHandler = require("../utils/errorHandler")
const sendingEmail = require("../utils/email")
// Check user authenticated?
exports.isAuthenticateduser = catchAsyncErrors(async (req, res, next) => {
  let token
  //console.log(req)
  console.log(req.cookies.token)
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  } else {
    token = req.cookies.token
  }
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401))
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findByPk(decoded.username)

  next()
})

exports.checkGroupAPM = async function (req, res, next) {
  const { username } = req.body
  const user = await User.findOne({
    where: { username },
    include: [{ model: UserGroup, as: "usergrp" }]
  })
  const data = await user.getUsergrp()
  let success = ""
  data.forEach(usergrp => {
    if (usergrp.dataValues.role === "Superadmin") {
      success = "authAdmin"
    } else if (usergrp.dataValues.role === "PM") {
      success = "authPM"
    }
  })
  if (success === "authAdmin") {
    res.json("authAdmin")
  } else if (success === "authPM") {
    res.json("authPM")
  } else {
    res.json(false)
  }
}

exports.checkCreate = async function (req, res, next) {
  const { username } = req.body
  const { App_Acronym } = req.query
  const user = await UserGroup.findAll({
    where: { username, App_Acronym }
  })
  console.log(user)
  const app = await Application.findOne({ where: { App_Acronym } })
  console.log(app.dataValues.App_permit_Create)

  let success = false
  user.forEach(user => {
    if (user.dataValues.role === app.dataValues.App_permit_Create) {
      success = true
    }
  })

  res.json(success)
}

exports.checkGroup = async function (req, res, next) {
  let permission = ""
  const { username, sourceID, Task_id } = req.body
  const { App_Acronym } = req.query
  switch (sourceID) {
    case 1:
      permission = "permit_Open"
      break
    case 2:
      permission = "permit_toDoList"
      break
    case 3:
      permission = "permit_Doing"
      break
    case 4:
      permission = "permit_Done"
      break
  }

  console.log(permission)

  const privilege = await Application.findOne({
    where: { App_Acronym }
  })
  //console.log(privilege)

  const user = await User.findOne({
    where: { username },
    include: [{ model: UserGroup, as: "usergrp" }]
  })
  const data = await user.getUsergrp()
  const task = await Task.findOne({ where: { Task_id } })
  const currentDateTime = new Date().toLocaleString()
  let Task_notes = ""
  let newNotes = { username, Task_notes, currentDateTime }
  let success = false

  const addNotes = () => {
    if (task.Task_notes === null) {
      task.update({ Task_notes: JSON.stringify([newNotes]) })
    } else {
      let addedNotes = JSON.parse(task.Task_notes)
      //console.log(addedNotes)
      addedNotes.push(newNotes)
      task.update({ Task_notes: JSON.stringify(addedNotes) })
    }
  }

  data.forEach(usergrp => {
    if (privilege[`App_${permission}`] === usergrp.dataValues.role && App_Acronym === usergrp.dataValues.App_Acronym) {
      //console.log(task)
      success = true
      //update task state

      try {
        if (!task) {
          return next(new ErrorHandler("Database model not found!", 403))
        } else {
          switch (permission) {
            case "permit_Open":
              newNotes.Task_notes = "Moved task from 'Open' to 'ToDo'"
              task.update({
                Task_state: "ToDo"
              })
              addNotes()
              break
            case "permit_toDoList":
              newNotes.Task_notes = "Moved task from 'ToDo' to 'Doing'"
              task.update({
                Task_state: "Doing"
              })
              addNotes()
              break
            case "permit_Doing":
              newNotes.Task_notes = "Moved task from 'Doing' to 'Done'"
              task.update({
                Task_state: "Done"
              })
              addNotes()
              sendingEmail()
              break
            case "permit_Done":
              newNotes.Task_notes = "Moved task from 'Done' to 'Close'"
              task.update({
                Task_state: "Close"
              })
              addNotes()
              break
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  })
  res.json(success)
}

exports.checkGroupBack = async function (req, res, next) {
  let permission = ""
  const { username, sourceID, Task_id } = req.body
  const { App_Acronym } = req.query
  switch (sourceID) {
    case 3:
      permission = "permit_Doing"
      break
    case 4:
      permission = "permit_Done"
      break
  }

  console.log(permission)

  const privilege = await Application.findOne({
    where: { App_Acronym }
  })
  //console.log(privilege)

  const user = await User.findOne({
    where: { username },
    include: [{ model: UserGroup, as: "usergrp" }]
  })
  const data = await user.getUsergrp()
  const task = await Task.findOne({ where: { Task_id } })
  const currentDateTime = new Date().toLocaleString()
  let Task_notes = ""
  let newNotes = { username, Task_notes, currentDateTime }
  let success = false

  const addNotes = () => {
    if (task.Task_notes === null) {
      task.update({ Task_notes: JSON.stringify([newNotes]) })
    } else {
      let addedNotes = JSON.parse(task.Task_notes)
      //console.log(addedNotes)
      addedNotes.push(newNotes)
      task.update({ Task_notes: JSON.stringify(addedNotes) })
    }
  }

  data.forEach(usergrp => {
    if (privilege[`App_${permission}`] === usergrp.dataValues.role && App_Acronym === usergrp.dataValues.App_Acronym) {
      success = true

      //update task state
      try {
        if (!task) {
          return next(new ErrorHandler("Database model not found!", 403))
        } else {
          switch (permission) {
            case "permit_Doing":
              newNotes.Task_notes = "Moved task from 'Doing' to 'ToDo'"
              task.update({
                Task_state: "ToDo"
              })
              addNotes()
              break
            case "permit_Done":
              newNotes.Task_notes = "Moved task from 'Done' to 'Doing'"
              task.update({
                Task_state: "Doing"
              })
              addNotes()
              break
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  })
  res.json(success)
}
