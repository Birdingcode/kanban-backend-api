const apiRouter = require("express").Router()
const userController = require("./controllers/userController")
const authController = require("./controllers/authController")
const auth = require("./middlewares/auth")

apiRouter.get("/", (req, res) => res.json("Backend is up and running successfully!"))
apiRouter.post("/register", auth.isAuthenticateduser, authController.registerUser) //cleared
apiRouter.post("/login", authController.loginUser) //cleared
apiRouter.get("/logout", authController.logoutUser) //cleared

apiRouter.get("/userManagement", auth.isAuthenticateduser, userController.getAllUser) //cleared
apiRouter.post("/:username/changePassword/:id", auth.isAuthenticateduser, authController.changePassword) //cleared
apiRouter.post("/changeEmail", auth.isAuthenticateduser, authController.changeEmail) //cleared
apiRouter.post("/changeStatus", auth.isAuthenticateduser, authController.changeStatus) //cleared
apiRouter.post("/changeGroup", auth.isAuthenticateduser, authController.changeGroup) //cleared

apiRouter.post("/createGroup", auth.isAuthenticateduser, authController.createGroup) //cleared
apiRouter.post("/createApp", auth.isAuthenticateduser, authController.createApp) //cleared
apiRouter.post("/createPlan", auth.isAuthenticateduser, authController.createPlan) //cleared
apiRouter.post("/createTask", auth.isAuthenticateduser, authController.createTask) //cleared

apiRouter.post("/editApp", auth.isAuthenticateduser, authController.editApp) //cleared
apiRouter.post("/editPlan", auth.isAuthenticateduser, authController.editPlan) //cleared

// apiRouter.post("/changeTaskPlanName", auth.isAuthenticateduser, authController.changeTaskPlanName)
// apiRouter.post("/changeTaskDesc", auth.isAuthenticateduser, authController.changeTaskDesc)
// apiRouter.post("/changeTaskOwner", auth.isAuthenticateduser, authController.changeTaskOwner)
apiRouter.post("/changeTaskNotes", auth.isAuthenticateduser, authController.changeTaskNotes) //cleared

apiRouter.get("/getUserGroup", auth.isAuthenticateduser, userController.getUserGroup) //cleared
apiRouter.get("/getApp", auth.isAuthenticateduser, userController.getApp) //cleared
apiRouter.get("/getSpecificApp", auth.isAuthenticateduser, userController.getSpecificApp) //cleared
// apiRouter.get("/getPlan", auth.isAuthenticateduser, userController.getPlan)
apiRouter.get("/getSpecificPlan", auth.isAuthenticateduser, userController.getSpecificPlan) //cleared
apiRouter.get("/getSpecificPlanE", auth.isAuthenticateduser, userController.getSpecificPlanE) //cleared
apiRouter.get("/getTask", auth.isAuthenticateduser, userController.getTask) //cleared
apiRouter.get("/getSpecificTask", auth.isAuthenticateduser, userController.getSpecificTask) //cleared

apiRouter.get("/getGroupApp", auth.isAuthenticateduser, userController.getGroupApp) //cleared
apiRouter.get("/getCurrGroup", auth.isAuthenticateduser, userController.getCurrGroup) //cleared

apiRouter.post("/doesUsernameExist", authController.doesUsernameExist) //cleared
apiRouter.post("/doesEmailExist", authController.doesEmailExist) //cleared
apiRouter.post("/doesPasswordCondition", authController.doesPasswordCondition) //cleared
apiRouter.post("/doesNewEmailExist", authController.doesNewEmailExist) //cleared

apiRouter.post("/checkGroup", auth.isAuthenticateduser, auth.checkGroup)
apiRouter.post("/checkGroupBack", auth.isAuthenticateduser, auth.checkGroupBack)
apiRouter.post("/checkGroupAPM", auth.isAuthenticateduser, auth.checkGroupAPM) //cleared
apiRouter.post("/checkCreate", auth.isAuthenticateduser, auth.checkCreate) //cleared
apiRouter.post("/checkPlan", auth.isAuthenticateduser, auth.checkPlan) //cleared
apiRouter.get("/testing", authController.testing) //cleared

module.exports = apiRouter
