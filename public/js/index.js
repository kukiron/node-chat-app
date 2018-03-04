const socket = io() // eslint-disable-line

socket.on("connect", () => {
  console.log("Connection enabled")
})

socket.on("newMessage", msg => {
  console.log("New message recieved from the server", msg)
})

socket.on("welcomeMessage", msg => {
  console.log("New message recieved from the server", msg)
})
