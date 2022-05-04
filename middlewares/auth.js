const jwt = require("jsonwebtoken")
const User = require("../models/users")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")

// Check user authenticated?
exports.isAuthenticateduser = catchAsyncErrors(async (req, res, next) => {
  let token
  //console.log(req)
  //console.log(req.cookies)
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  } else {
    token = req.cookies.token
  }

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401))
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findByPk(decoded.userID)

  next()
})

// handling user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role(${req.user.role}) is not allowed to access this resource.`), 403)
    }
    next()
  }
}
