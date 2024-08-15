class ViewService {
    homePage(req, res) {
      res.render('home');
    }
  
    registerPage(req, res) {
      res.render('register');
    }
  
    loginPage(req, res) {
      res.render('login');
    }
  
    dashboardPage(req, res) {
      res.render('dashboard');
    }
  }
  
  module.exports = new ViewService();
  