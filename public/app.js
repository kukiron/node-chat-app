const socket = io() // eslint-disable-line

socket.on("connect", () => {
  console.log("Connection enabled")
})

socket.on("disconnect", () => {
  console.log("Disconnected from the server")
})
