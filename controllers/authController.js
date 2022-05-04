const User = require("../models/Users")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const { request } = require("express")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwtToken")

// Register a new user => /register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password, role } = req.body
  console.log(req.body)
  const user = await User.create({
    username,
    email,
    password,
    role
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

exports.doesUsernameExist = function (req, res) {
  User.findOne(req.body.username)
    .then(function () {
      res.json(true)
    })
    .catch(function (e) {
      res.json(false)
    })
}

exports.doesEmailExist = async function (req, res) {
  User.findOne(req.body.email)
    .then(function () {
      res.json(true)
    })
    .catch(function (e) {
      res.json(false)
    })
}

exports.doesPasswordCondition = async function (req, res) {
  if (!req.body.password.match(/^[a-zA-Z0-9!@#$%^&*]{8,10}$/)) {
    res.json(true)
  }
}
