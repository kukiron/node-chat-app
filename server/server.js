const express = require("express")
// const morgan = require("morgan")
const path = require("path")
const http = require("http")
const socketIO = require("socket.io")

const { generateMessage, generateLocationMessage } = require("./utils/message")
const isRealString = require("./utils/validation")
const usersFunc = require("./utils/users")

const app = express()
const port = process.env.PORT || 3075

app.use(express.static(path.resolve(__dirname, "../public")))

app.get("/", (req, res) => {
  res.sendFile("index.html")
})

const server = http.createServer(app)
const io = socketIO(server)
const appUsers = usersFunc()

io.on("connection", socket => {
  console.log("New user connected")

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name are required.")
    }

    socket.join(params.room)
    appUsers.removeUser(socket.id)
    appUsers.addUser(socket.id, params.name, params.room)

    io
      .to(params.room)
      .emit("updateUsersList", appUsers.getUsersList(params.room))
    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the chat app")
    )
    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined the room`)
      )

    callback()
  })

  socket.on("createMessage", (message, callback) => {
    const user = appUsers.getUser(socket.id)

    if (user && isRealString(message.text)) {
      io
        .to(user.room)
        .emit("newMessage", generateMessage(user.name, message.text))
    }
    callback()
  })

  socket.on("createLocationMessage", coordinate => {
    const user = appUsers.getUser(socket.id)

    if (user) {
      io
        .to(user.room)
        .emit(
          "newLocationMessage",
          generateLocationMessage(
            user.name,
            coordinate.latitude,
            coordinate.longitude
          )
        )
    }
  })

  socket.on("disconnect", () => {
    const user = appUsers.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit("updateUsersList", appUsers.getUsersList(user.room))
      io
        .to(user.room)
        .emit(
          "newMessage",
          generateMessage("Admin", `${user.name} left the room`)
        )
    }
  })
})

server.listen(port, () => {
  console.log(`🌍 Express server is up and running on port: ${port} 🐎`)
})
