const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const port = process.env.PORT || 3075

app.use(morgan("combined"))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json({ type: "*/*" }))
app.use(express.static(path.resolve(__dirname, "../public")))

app.get("/", (req, res) => {
  res.sendFile("index.html")
})

app.listen(port, () => {
  console.log(`🌍 Express server is up and running on port: ${port} 🐎`)
})
