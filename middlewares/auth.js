const jwt = require("jsonwebtoken")
const User = require("../models/Db").models.User
const UserGroup = require("../models/Db").models.UserGroup
const GroupName = require("../models/Db").models.GroupName
const Application = require("../models/Db").models.Application
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")
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

  data.forEach(usergrp => {
    if (usergrp.dataValues.role === "Superadmin") {
      res.json("authAdmin")
    } else if (usergrp.dataValues.role === "PM") {
      res.json("authPM")
    }
  })
}

exports.checkGroup = async function (req, res, next) {
  let permission = ""
  const { username, sourceID } = req.body
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
  console.log(privilege[`App_${permission}`])
  data.forEach(usergrp => {
    if (privilege[`App_${permission}`] === usergrp.dataValues.role && App_Acronym === usergrp.dataValues.App_Acronym) {
      res.json(`auth${permission}`)

      //update task state
    } else {
      res.json(false)
    }
  })
}

exports.checkGroupBack = async function (req, res, next) {
  let permission = ""
  const { username, sourceID } = req.body
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
  console.log(privilege[`App_${permission}`])
  data.forEach(usergrp => {
    if (privilege[`App_${permission}`] === usergrp.dataValues.role && App_Acronym === usergrp.dataValues.App_Acronym) {
      res.json(`auth${permission}`)

      //update task state
    } else {
      res.json(false)
    }
  })
}
