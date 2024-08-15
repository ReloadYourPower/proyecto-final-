module.exports = {
  // Middleware para actualizar la última conexión en el login
 updateLastConnection : async (req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    await User.findByIdAndUpdate(req.user._id, { last_connection: new Date() });
  }
  next();
},
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/login');
  }
  ,
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/profile');
  }}
  