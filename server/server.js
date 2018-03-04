const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const path = require("path")
const http = require("http")
const socketIO = require("socket.io")

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

const server = http.createServer(app)
const io = socketIO(server)

io.on("connection", socket => {
  console.log("New connection established")

  socket.on("disconnect", () => {
    console.log("User is disconnected")
  })
})

server.listen(port, () => {
  console.log(`🌍 Express server is up and running on port: ${port} 🐎`)
})
