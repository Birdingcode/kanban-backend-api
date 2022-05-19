const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config({ path: "./config/config.env" })

async function sendEmail() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "kanbantestmail@gmail.com",
      pass: process.env.TESTMAILPASSWORD.toString()
    }
  })

  let info = await transporter.sendMail({
    from: '"Kanban Testmail 👻" <kanbantestmail@gmail.com>', // sender address
    to: "kanbantestmail@gmail.com", // list of receivers
    subject: "A Task has been promoted to Done ✔", // Subject line
    text: "This is an automated message" // plain text body
  })

  console.log("Message sent: %s", info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = sendEmail
