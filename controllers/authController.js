const User = require("../models/Db").models.User
const UserGroup = require("../models/Db").models.UserGroup
const Application = require("../models/Db").models.Application
const Plan = require("../models/Db").models.Plan
const Task = require("../models/Db").models.Task
const GroupName = require("../models/Db").models.GroupName
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const { request } = require("express")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwtToken")

// Register a new user => /register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { username, oldEmail, password, role } = req.body
  if (!username || !oldEmail || !password || !role) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }

  console.log(req.body)
  try {
    const user = await User.create({
      username,
      email: oldEmail,
      password
    })

    for (let i = 0; i < role.length; i++) {
      await UserGroup.create({
        username,
        role: role[i]
      })
    }

    // Create JWT Token
    sendToken(user, 200, res)
  } catch (e) {
    console.log(e)
  }
})

// Register a new application => /createApp
exports.createApp = catchAsyncErrors(async (req, res, next) => {
  const { App_Acronym, App_Description, App_startDate, App_endDate, App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, App_permit_Create } = req.body
  console.log(req.body)
  if (!App_Acronym || !App_Description || !App_startDate || !App_endDate || !App_permit_Open || !App_permit_toDoList || !App_permit_Doing || !App_permit_Done || !App_permit_Create) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }

  try {
    await Application.create({
      App_Acronym,
      App_Description,
      App_startDate,
      App_endDate,
      App_permit_Open,
      App_permit_toDoList,
      App_permit_Doing,
      App_permit_Done,
      App_permit_Create
    })
    res.json("App Created!")
  } catch (e) {
    console.log(e)
  }
})

exports.createPlan = catchAsyncErrors(async (req, res, next) => {
  const { Plan_name, App_Acronym, Plan_Description, Plan_startDate, Plan_endDate } = req.body
  console.log(req.body)
  if (!Plan_name || !App_Acronym || !Plan_Description || !Plan_startDate || !Plan_endDate) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }

  try {
    await Plan.create({
      Plan_name,
      App_Acronym,
      Plan_Description,
      Plan_startDate,
      Plan_endDate
    })
    res.json("Plan Created!")
  } catch (e) {
    console.log(e)
  }
})

exports.createGroup = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.body
  console.log(req.body)
  if (!role) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }

  try {
    await GroupName.create({
      role
    })
    res.json("Group Created!")
  } catch (e) {
    console.log(e)
  }
})

exports.createTask = catchAsyncErrors(async (req, res, next) => {
  const { username, Task_name, Plan_name, Task_description, Task_notes, Task_creator, Task_createDate } = req.body
  const { App_Acronym } = req.query
  console.log(req.body)
  if (!Task_name || !App_Acronym || !Task_description || !Task_notes || !Task_creator || !Task_createDate) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }

  const currentDateTime = new Date().toLocaleString()
  let newNotes = { username, Task_notes, currentDateTime }

  let rnum = await Application.findOne({ where: { App_Acronym } })
  let taskid = App_Acronym.concat("_", rnum.App_Rnumber)
  try {
    await Task.create({
      Task_id: taskid,
      Task_name,
      Plan_name,
      App_Acronym,
      Task_description,
      Task_notes: JSON.stringify([newNotes]),
      Task_creator,
      Task_createDate
    })
    await rnum.update({ App_Rnumber: rnum.App_Rnumber + 1 })
    res.json("Task Created!")
  } catch (e) {
    console.log(e)
  }
})

// Login user => /login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body
  console.log(req.body)
  // Checks if email or password is entered by user
  if (!username || !password) {
    return next(new ErrorHandler("Please enter Username & Password"), 400)
  }

  // Finding user in database
  const user = await User.findOne({ where: { username } })
  console.log(user)

  if (!user) {
    return next(new ErrorHandler("Invalid Username or Password", 401))
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password)
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Username or Password", 401))
  }

  sendToken(user, 200, res)
})

exports.logoutUser = function (req, res) {
  console.log("logoutUser")
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true
  }
  res.cookie("token", "none", options)
  //res.json("hi")
}

exports.doesUsernameExist = async function (req, res) {
  const findUser = await User.findOne({ where: { username: req.body.username } })
  if (findUser != null) {
    console.log("Found!")
    res.json(true)
  } else {
    console.log("Not Found!")
    res.json(false)
  }
}

exports.doesEmailExist = async function (req, res) {
  const findEmail = await User.findOne({ where: { email: req.body.oldEmail } })
  if (findEmail != null) {
    console.log("Found")
    res.json(true)
  } else {
    console.log("Not Found!")
    res.json(false)
  }
}

exports.doesNewEmailExist = async function (req, res) {
  const findNewEmail = await User.findOne({ where: { email: req.body.newEmail } })
  if (findNewEmail != null) {
    console.log("Found")
    res.json(true)
  } else {
    console.log("Not Found!")
    res.json(false)
  }
}

exports.changeEmail = catchAsyncErrors(async function (req, res, next) {
  const { oldEmail, newEmail, cfmEmail } = req.body
  if (!oldEmail || !newEmail || !cfmEmail) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }
  if (newEmail !== cfmEmail) {
    return next(new ErrorHandler("Passwords do not match", 401))
  }
  const user = await User.findOne({ where: { email: oldEmail } })
  if (!user) {
    return next(new ErrorHandler("Database model not found!", 403))
  } else {
    await user.update({ email: cfmEmail })
    res.json("Email changed!")
  }
})

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

exports.doesPasswordCondition = async function (req, res) {
  const { password } = req.body
  var regularExpression = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{7,11}$/)
  if (password.match(regularExpression)) {
    res.json(true)
  } else {
    res.json(false)
  }
}

exports.changePassword = catchAsyncErrors(async function (req, res, next) {
  console.log(req.params)
  const { password, cfmpassword } = req.body
  const username = req.params.username
  if (!username || !password || !cfmpassword) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }

  if (password !== cfmpassword) {
    return next(new ErrorHandler("Passwords do not match", 401))
  }

  const user = await User.findOne({ where: { username } })
  if (!user) {
    return next(new ErrorHandler("Database model not found!", 403))
  } else {
    await user.update({ password: cfmpassword })
    res.json("Password changed!")
  }
})

exports.editApp = catchAsyncErrors(async function (req, res, next) {
  const { App_Acronym, App_Description, App_startDate, App_endDate, App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, App_permit_Create } = req.body
  console.log(req.body)
  if (!App_Acronym || !App_Description || !App_startDate || !App_endDate || !App_permit_Open || !App_permit_toDoList || !App_permit_Doing || !App_permit_Done || !App_permit_Create) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }

  const app = await Application.findOne({ where: { App_Acronym } })
  console.log(app)
  try {
    if (!app) {
      return next(new ErrorHandler("Database model not found!", 403))
    } else {
      await Application.update(
        {
          App_Description: App_Description,
          App_startDate: App_startDate,
          App_endDate: App_endDate,
          App_permit_Open: App_permit_Open,
          App_permit_toDoList: App_permit_toDoList,
          App_permit_Doing: App_permit_Doing,
          App_permit_Done: App_permit_Done,
          App_permit_Create: App_permit_Create
        },
        { where: { App_Acronym } }
      )
      res.json("App updated!")
    }
  } catch (e) {
    console.log(e)
  }
})

exports.editPlan = catchAsyncErrors(async function (req, res, next) {
  const { Plan_name, App_Acronym, Plan_startDate, Plan_endDate } = req.body
  console.log(req.body)
  if (!Plan_name || !App_Acronym || !Plan_startDate || !Plan_endDate) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }

  const plan = await Plan.findOne({ where: { App_Acronym: App_Acronym, Plan_name: Plan_name } })
  //console.log(plan)
  try {
    if (!plan) {
      return next(new ErrorHandler("Database model not found!", 403))
    } else {
      await Plan.update(
        {
          Plan_startDate: Plan_startDate,
          Plan_endDate: Plan_endDate
        },
        { where: { App_Acronym: App_Acronym, Plan_name: Plan_name } }
      )
      res.json("Plan updated!")
    }
  } catch (e) {
    console.log(e)
  }
})

exports.changeGroup = catchAsyncErrors(async function (req, res, next) {
  const { username, role } = req.body
  //console.log(req.body)
  //const oldUser = await UserGroup.findAll({ where: { username } })
  const oldGroup = await UserGroup.destroy({ where: { username } })
  //console.log(oldGroup)

  try {
    for (let i = 0; i < role.length; i++) {
      const usery = await UserGroup.create({
        username,
        role: role[i]
      })
    }
    res.json("Group Updated")
  } catch (e) {
    console.log(e)
  }
})

// exports.changeTaskPlanName = catchAsyncErrors(async function (req, res, next) {
//   const { Task_id, Plan_name } = req.body
//   if (!Plan_name) {
//     return next(new ErrorHandler("Please fill in all fields", 400))
//   }

//   const task = await Task.findOne({ where: { Task_id } })
//   if (!task) {
//     return next(new ErrorHandler("Database model not found!", 403))
//   } else {
//     await task.update({ Plan_name: Plan_name })
//     res.json("Plan Name changed!")
//   }
// })

// exports.changeTaskDesc = catchAsyncErrors(async function (req, res, next) {
//   const { Task_id, Task_description } = req.body
//   if (!Task_description) {
//     return next(new ErrorHandler("Please fill in all fields", 400))
//   }

//   const task = await Task.findOne({ where: { Task_id } })
//   if (!task) {
//     return next(new ErrorHandler("Database model not found!", 403))
//   } else {
//     await task.update({ Task_description: Task_description })
//     res.json("Task Desc changed!")
//   }
// })

// exports.changeTaskOwner = catchAsyncErrors(async function (req, res, next) {
//   const { Task_id, Task_owner } = req.body
//   if (!Task_owner) {
//     return next(new ErrorHandler("Please fill in all fields", 400))
//   }

//   const task = await Task.findOne({ where: { Task_id } })
//   if (!task) {
//     return next(new ErrorHandler("Database model not found!", 403))
//   } else {
//     await task.update({ Task_owner: Task_owner })
//     res.json("Task owner changed!")
//   }
// })

exports.changeTaskNotes = catchAsyncErrors(async function (req, res, next) {
  const { Task_id, Task_notes, username } = req.body
  console.log(req.body)
  if (!Task_notes) {
    return next(new ErrorHandler("Please fill in all fields", 400))
  }
  const currentDateTime = new Date().toLocaleString()
  const task = await Task.findOne({ where: { Task_id } })
  let newNotes = { username, Task_notes, currentDateTime }

  if (task.Task_notes === null) {
    await task.update({ Task_notes: JSON.stringify([newNotes]) })
    res.json("Task Notes Updated! 1")
  } else {
    let addedNotes = JSON.parse(task.Task_notes)
    //console.log(addedNotes)
    addedNotes.push(newNotes)
    await task.update({ Task_notes: JSON.stringify(addedNotes), Task_owner: username })
    res.json("Task Notes Updated! 2")
  }
})

exports.testing = catchAsyncErrors(async function (req, res, next) {
  console.log(req.query)
  res.send("ok")
})
