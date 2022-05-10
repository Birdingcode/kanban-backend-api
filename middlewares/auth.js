const jwt = require("jsonwebtoken")
//const User = require("../models/users")
const User = require("../models/Db").models.User
const UserGroup = require("../models/Db").models.UserGroup
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

exports.checkGroup = async function (req, res, next) {
  const { username } = req.body
  console.log(req.body)
  const user = await User.findOne({ where: { username }, include: [{ model: UserGroup, as: "usergrp" }] })
  const data = await user.getUsergrp()
  data.forEach(usergrp => {
    if (usergrp.dataValues.role === "Superadmin") {
      res.json(true)
    }
  })
}
