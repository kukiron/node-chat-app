const socket = io() // eslint-disable-line

socket.on("connect", () => {
  console.log("Connection enabled")
})

socket.on("disconnect", () => {
  console.log("Disconnected from the server")
})

socket.on("newMessage", msg => {
  const formattedTime = moment(msg.createdAt).format("h:mm a MMM Do, YYYY") // eslint-disable-line
  const template = $("#message-template").html()

  // eslint-disable-next-line
  const html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  })

  $("#messages").append(html)
})

socket.on("newLocationMessage", msg => {
  const formattedTime = moment(msg.createdAt).format("h:mm a MMM Do, YYYY") // eslint-disable-line
  const template = $("#location-message-template").html()

  // eslint-disable-next-line
  const html = Mustache.render(template, {
    url: msg.url,
    from: msg.from,
    createdAt: formattedTime
  })

  $("#messages").append(html)
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
