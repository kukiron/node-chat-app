const socket = io() // eslint-disable-line

socket.on("connect", () => {
  console.log("Connection enabled")
})

socket.on("disconnect", () => {
  console.log("Disconnected from the server")
})

socket.on("newMessage", msg => {
  console.log("New message recieved", msg)

  const li = $("<li></li>")
  li.text(`${msg.from}: ${msg.text}`)

  $("#messages").append(li)
})

$("#message-form").on("submit", function(e) {
  e.preventDefault()

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: $("[name=message]").val()
    },
    data => {
      console.log("Got it!", data)
    }
  )
})
