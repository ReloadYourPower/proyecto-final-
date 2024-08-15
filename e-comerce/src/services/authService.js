const UserDAO = require('../dao/implementations/userDAO');

class AuthService {
  async register(userData) {
    const user = await UserDAO.addUser(userData);
    return user;
  }

  async login(email, password) {
    const user = await UserDAO.getUserByEmail(email);
    if (!user || !await user.isPasswordValid(password)) {
      throw new Error('Invalid email or password');
    }
    return user;
  }

  async logout(req) {
    req.logout();
  }
}

module.exports = new AuthService();
