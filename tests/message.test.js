const { assert, expect } = require("chai")

const generateMessage = require("../server/utils/message")

describe("generateMessage", () => {
  it("should return the correct message object", () => {
    const from = "Kafil"
    const text = "Hello world"
    const msgObj = generateMessage(from, text)

    assert.equal(msgObj.from, "Kafil", `message recived from ${msgObj.from}`)
    assert.equal(msgObj.text, "Hello world", `message text was ${msgObj.text}`)
    expect(msgObj).to.include({ from, text })
    expect(msgObj.createdAt).to.be.a("number")
  })
})
