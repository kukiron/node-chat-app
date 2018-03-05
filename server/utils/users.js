const usersFunc = function() {
  const users = []

  return {
    users,
    addUser: function(id, name, room) {
      const user = { id, name, room }
      this.users.push(user)
      return user
    },

    removeUser: function(id) {
      const user = this.getUser(id)
      user && (this.users = this.users.filter(user => user.id !== id))

      return user
    },

    getUser: function(id) {
      const searchedUser = this.users.filter(user => user.id === id)
      return searchedUser[0]
    },

    getUsersList: function(room) {
      const users = this.users.filter(user => user.room === room)
      const namesArray = users.map(user => user.name)

      return namesArray
    }
  }
}

module.exports = usersFunc
