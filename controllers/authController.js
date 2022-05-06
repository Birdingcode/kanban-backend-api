const User = require("../models/Db").models.User
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const { request } = require("express")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwtToken")

// Register a new user => /register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password, privilege } = req.body
  console.log(req.body)
  const user = await User.create({
    username,
    email,
    password,
    privilege
  })

  // Create JWT Token
  sendToken(user, 200, res)
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
  res.clearCookie("token")
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

exports.doesPasswordCondition = async function (req, res) {
  if (req.body.password.match(/^[a-zA-Z0-9!@#$%^&*]{8,10}$/)) {
    res.json(true)
  } else {
    res.json(false)
  }
}

exports.changePassword = catchAsyncErrors(async function (req, res, next) {
  const { username, password, cfmpassword } = req.body
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
