const Router= require('express');
const router = Router();
const {registerPage,loginPage,dashboardPage,profile} = require('../controllers/viewController');
const { ensureAuthenticated, forwardAuthenticated,updateLastConnection } = require('../middlewares/authMiddleware');
const {registerUser} = require('../controllers/authController');
const passport = require('passport')
const User = require('../models/User');
const { handleError } = require('../middlewares/errorMiddleware');

router.get('/',forwardAuthenticated,loginPage);
router.get('/register', forwardAuthenticated, registerPage);
// Ruta POST para el registro de usuarios
router.post('/register', forwardAuthenticated,registerUser);
router.post('/login',  (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next)},updateLastConnection);

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    const { email } = req.body;

        const user = User.findOne({ email });
        if (!user) {
          return res.status(404).send('Usuario no encontrado');
        }
        res.render('profile', {
          title: 'Perfil de Usuario',
          user: {
            email: user.email,
            location: user.location,
            bio: user.bio
          },
          isAuthenticated: req.isAuthenticated()
        });
      }
  else {
    res.redirect('/login');
  }
});
router.get('/dashboard', ensureAuthenticated, dashboardPage);
// Middleware de manejo de errores
router.use((err, req, res, next) => {
  if (err.status) {
    return handleError(err, req, res, next);
  }
  // Si no es un error manejado por el diccionario, pasa al siguiente middleware de error
  next(err);
});
module.exports = router;
