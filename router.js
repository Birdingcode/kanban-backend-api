const apiRouter = require("express").Router()
const userController = require("./controllers/userController")
const authController = require("./controllers/authController")

const User = require("./models/Users")
const db = require("./models/Db")
const auth = require("./middlewares/auth")

apiRouter.get("/", (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"))
apiRouter.post("/register", auth.isAuthenticateduser, authController.registerUser)
apiRouter.post("/login", authController.loginUser)
apiRouter.get("/userManagement", auth.isAuthenticateduser, userController.getAllUser)

apiRouter.post("/doesUsernameExist", authController.doesUsernameExist)
apiRouter.post("/doesEmailExist", authController.doesEmailExist)
apiRouter.post("/doesPasswordCondition", authController.doesPasswordCondition)

module.exports = apiRouter
