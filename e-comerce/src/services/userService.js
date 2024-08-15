const UserDAO = require('../dao/implementations/userDAO');

class UserService {
  async getUsers() {
    return await UserDAO.getAllUsers();
  }

  async getUserById(userId) {
    return await UserDAO.getUserById(userId);
  }

  async updateUser(userId, userData) {
    return await UserDAO.updateUser(userId, userData);
  }

  async deleteUser(userId) {
    return await UserDAO.deleteUser(userId);
  }
}

module.exports = new UserService();
