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

socket.on("newLocationMessage", msg => {
  const li = $("<li></li>")
  const a = $('<a target="_blank">My current location</a>')

  li.text(`${msg.from}: `)
  a.attr("href", msg.url)
  li.append(a)
  $("#messages").append(li)
})

$("#message-form").on("submit", function(e) {
  e.preventDefault()

  const msgTextBox = $("[name=message]")

  if (msgTextBox.val() !== "") {
    socket.emit(
      "createMessage",
      {
        from: "User",
        text: msgTextBox.val()
      },
      () => {
        msgTextBox.val("")
      }
    )
  }
})

const locationButton = $("#send-location")
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("You don't have Geolocation support.")
  }

  locationButton.attr("disabled", "disabled").text("Sending location...")

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr("disabled").text("Send location")
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    },
    function() {
      locationButton.removeAttr("disabled").text("Send location")
      alert("Unable to fetch location.")
    }
  )
})
