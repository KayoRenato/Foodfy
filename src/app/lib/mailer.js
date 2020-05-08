const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
  host: process.env.MT_HOST,
  port: process.env.MT_PORT,
  auth: {
    user: process.env.MT_USER,
    pass: process.env.MT_PASS
  }
});