const { assert, expect } = require("chai")

const isRealString = require("../server/utils/validation")

describe("isRealString", () => {
  it("should allow strings with non-space characters", () => {
    const validStr1 = "Go home"
    const validStr2 = "  loki thor "

    assert.equal(
      isRealString(validStr1),
      true,
      "isRealString function returns false"
    )
    expect(isRealString(validStr1)).to.equal(true)
    expect(isRealString(validStr2)).to.equal(true)
  })

  it("should reject non-string values", () => {
    const invalidStr1 = undefined

    assert.equal(
      isRealString(invalidStr1),
      false,
      "isRealString function returns false"
    )
    expect(isRealString(invalidStr1)).to.equal(false)
  })

  it("should reject strings only spaces", () => {
    const invalidStr2 = "   "

    expect(isRealString(invalidStr2)).to.equal(false)
  })
})
