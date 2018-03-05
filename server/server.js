const express = require("express")
// const morgan = require("morgan")
const bodyParser = require("body-parser")
const path = require("path")
const http = require("http")
const socketIO = require("socket.io")

const { generateMessage, generateLocationMessage } = require("./utils/message")
const isRealString = require("./utils/validation")

const app = express()
const port = process.env.PORT || 3075

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

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"))

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  )

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name || !isRealString(params.room))) {
      callback("Name & room are not valid.")
    }

    callback()
  })

  socket.on("createMessage", (message, callback) => {
    console.log("Message recieved from browser", message)

    io.emit("newMessage", generateMessage(message.from, message.text))
    callback()
  })

  socket.on("createLocationMessage", coordinate => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage(
        "Admin",
        coordinate.latitude,
        coordinate.longitude
      )
    )
  })

  socket.on("disconnect", () => {
    console.log("User is disconnected")
  })
})

server.listen(port, () => {
  console.log(`🌍 Express server is up and running on port: ${port} 🐎`)
})
