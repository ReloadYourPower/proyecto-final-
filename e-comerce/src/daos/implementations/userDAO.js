const User = require('../../models/User');

class UserDAO {
  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async addUser(user) {
    const newUser = new User(user);
    return await newUser.save();
  }

  async updateUser(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserDAO();
