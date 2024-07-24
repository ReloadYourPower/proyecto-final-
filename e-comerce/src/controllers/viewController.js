const homePage = (req, res) => {
    res.render('index',{isAuthenticated: req.isAuthenticated() });
    
  };
  
  const registerPage = (req, res) => {
    res.render('register');
  };
  
  const loginPage = (req, res) => {
    res.render('login');
  };
  
  const profile = (req, res) => {
    res.render('profile');
  };

const dashboardPage = (req, res) => {
  res.render('dashboard', { user: req.user, isAuthenticated: req.isAuthenticated() });
};
  const error401 = (req, res) => {
    res.render('error401',{  isAuthenticated: req.isAuthenticated() });
  };

  
  
  module.exports = {
    dashboardPage,loginPage,registerPage,homePage,profile,error401
  }