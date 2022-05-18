const apiRouter = require("express").Router()
const userController = require("./controllers/userController")
const authController = require("./controllers/authController")
const auth = require("./middlewares/auth")

apiRouter.get("/", (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"))
apiRouter.post("/register", auth.isAuthenticateduser, authController.registerUser)
apiRouter.post("/login", authController.loginUser)
apiRouter.get("/logout", authController.logoutUser)

apiRouter.get("/userManagement", auth.isAuthenticateduser, userController.getAllUser)
apiRouter.post("/changePassword", auth.isAuthenticateduser, authController.changePassword)
apiRouter.post("/changeEmail", auth.isAuthenticateduser, authController.changeEmail)
apiRouter.post("/changeStatus", auth.isAuthenticateduser, userController.changeStatus)

apiRouter.post("/createGroup", auth.isAuthenticateduser, authController.createGroup)
apiRouter.post("/createApp", auth.isAuthenticateduser, authController.createApp)
apiRouter.post("/createPlan", auth.isAuthenticateduser, authController.createPlan)
apiRouter.post("/createTask", auth.isAuthenticateduser, authController.createTask)
apiRouter.post("/editApp", auth.isAuthenticateduser, authController.editApp)
apiRouter.post("/editPlan", auth.isAuthenticateduser, authController.editPlan)
apiRouter.get("/getApp", auth.isAuthenticateduser, userController.getApp)
apiRouter.get("/getSpecificApp", auth.isAuthenticateduser, userController.getSpecificApp)
apiRouter.get("/getPlan", auth.isAuthenticateduser, userController.getPlan)
apiRouter.get("/getSpecificPlan", auth.isAuthenticateduser, userController.getSpecificPlan)
apiRouter.get("/getSpecificPlanE", auth.isAuthenticateduser, userController.getSpecificPlanE)
apiRouter.get("/getTask", auth.isAuthenticateduser, userController.getTask)
apiRouter.get("/getGroupApp", auth.isAuthenticateduser, userController.getGroupApp)

apiRouter.post("/doesUsernameExist", authController.doesUsernameExist)
apiRouter.post("/doesEmailExist", authController.doesEmailExist)
apiRouter.post("/doesPasswordCondition", authController.doesPasswordCondition)
apiRouter.post("/doesNewEmailExist", authController.doesNewEmailExist)

apiRouter.post("/checkGroup", auth.isAuthenticateduser, auth.checkGroup)
apiRouter.post("/checkGroupBack", auth.isAuthenticateduser, auth.checkGroupBack)
apiRouter.post("/checkGroupAPM", auth.isAuthenticateduser, auth.checkGroupAPM)

module.exports = apiRouter
