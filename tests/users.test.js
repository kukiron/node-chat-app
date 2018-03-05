const { assert, expect } = require("chai")

const usersFunc = require("../server/utils/users")

describe("usersFunc", () => {
  let appUsers
  beforeEach(() => {
    appUsers = usersFunc()
    appUsers.users = [
      {
        id: 1,
        name: "Harun",
        room: "Node Course"
      },
      {
        id: 2,
        name: "Kafil",
        room: "React Course"
      },
      {
        id: 3,
        name: "Jimbo",
        room: "Node Course"
      }
    ]
  })

  it("should add a user to the list", () => {
    const appUsers = usersFunc()
    const newUser = {
      id: 123,
      name: "Ginger",
      room: "Angular Course"
    }
    const users = appUsers.addUser(newUser.id, newUser.name, newUser.room)

    assert.deepInclude(users, newUser, `user array should contain ${newUser}`)
    expect(users)
      .to.be.an("object")
      .that.deep.includes(newUser)
    expect(appUsers.users.length).to.equal(1)
  })

  it("should remove a user", () => {
    const user = appUsers.removeUser(2)

    expect(user).to.deep.equal({
      id: 2,
      name: "Kafil",
      room: "React Course"
    })
    expect(user.id).to.equal(2)
    expect(appUsers.users)
      .to.be.an("array")
      .that.has.lengthOf(2)
  })

  it("should NOT remove a user with incorrect id", () => {
    const user = appUsers.removeUser(22)

    expect(user).to.be.an("undefined")
    expect(appUsers.users)
      .to.be.an("array")
      .that.has.lengthOf(3)
  })

  it("should return the user with given id", () => {
    const user = appUsers.getUser(1)

    expect(user).to.deep.equal({
      id: 1,
      name: "Harun",
      room: "Node Course"
    })
    expect(user)
      .to.be.an("object")
      .that.has.a.property("id", 1)
  })

  it("should NOT return a user with incorrect id", () => {
    const user = appUsers.getUser(42)

    expect(user).to.be.an("undefined")
  })

  it("should return names for node course", () => {
    const users = appUsers.getUsersList("Node Course")

    expect(users)
      .to.be.an("array")
      .that.deep.equals(["Harun", "Jimbo"])
    expect(users.length).to.equal(2)
  })

  it("should return names for react course", () => {
    const users = appUsers.getUsersList("React Course")

    expect(users)
      .to.be.an("array")
      .that.deep.equals(["Kafil"])
    expect(users.length).to.equal(1)
  })
})
