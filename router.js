const apiRouter = require("express").Router()
const userController = require("./controllers/userController")
const authController = require("./controllers/authController")
const auth = require("./middlewares/auth")

apiRouter.get("/", (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"))
apiRouter.post("/register", auth.isAuthenticateduser, authController.registerUser)
apiRouter.post("/login", authController.loginUser)
apiRouter.get("/userManagement", auth.isAuthenticateduser, userController.getAllUser)
apiRouter.post("/changePassword", auth.isAuthenticateduser, authController.changePassword)
apiRouter.post("/changeEmail", auth.isAuthenticateduser, authController.changeEmail)
apiRouter.post("/changeStatus", auth.isAuthenticateduser, userController.changeStatus)

apiRouter.get("/logout", authController.logoutUser)
apiRouter.post("/doesUsernameExist", authController.doesUsernameExist)
apiRouter.post("/doesEmailExist", authController.doesEmailExist)
apiRouter.post("/doesPasswordCondition", authController.doesPasswordCondition)
apiRouter.post("/doesNewEmailExist", authController.doesNewEmailExist)

apiRouter.get("/associate", userController.findRoleAll)
apiRouter.post("/checkGroup", auth.checkGroup)

module.exports = apiRouter
