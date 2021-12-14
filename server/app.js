const path = require("path")
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
module.exports = app

app.use(morgan("dev"))

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// auth and api routes
app.use("/auth", require("./auth"))
app.use("/api", require("./api"))

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found")
    err.status = 404
    next(err)
  } else {
    next()
  }
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal server error.")
})
