const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
dotenv.config({ path: "./config/config.env" })

//Database
const db = require("./models/Db.js")

// ErrorHandler
const ErrorHandler = require("./utils/errorHandler")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set cookie parser
app.use(cookieParser())

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use("/", require("./router"))
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404))
})

db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.error("Unable to connect to the database:", error))

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handling Unhandled Rejection
process.on("unhandledRejection", err => {
  console.log(err)
  console.log(`Error: ${err.message}`)
  console.log("Shutting down server due to Unhandled promise rejection.")
  server.close(() => {
    process.exit(1)
  })
})

// Handling Uncaught Exception
process.on("uncaughtException", err => {
  console.log(`Error: ${err.message}`)
  console.log("Shutting down due to Uncaught exception.")
  process.exit(1)
})
