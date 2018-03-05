const { assert, expect } = require("chai")

const {
  generateMessage,
  generateLocationMessage
} = require("../server/utils/message")

describe("generateMessage", () => {
  it("should return the correct message object", () => {
    const from = "Kafil",
      text = "Hello world",
      msgObj = generateMessage(from, text)

    assert.equal(msgObj.from, from, `message recived from ${msgObj.from}`)
    assert.equal(msgObj.text, text, `message text was ${msgObj.text}`)
    expect(msgObj).to.include({ from, text })
    expect(msgObj.createdAt).to.be.a("number")
  })
})

describe("generateLocationMessage", () => {
  it("should return the message object with location url", () => {
    const from = "No one",
      latitude = 13.223,
      longitude = 87.234,
      url = `https://www.google.com/maps?q=${latitude},${longitude}`,
      msgObj = generateLocationMessage(from, latitude, longitude)

    assert.equal(msgObj.from, from, `message recieved from ${msgObj.from}`)
    expect(msgObj.url).to.be.a("string")
    expect(msgObj).to.include({ from, url })
    expect(msgObj.createdAt).to.be.a("number")
  })
})
