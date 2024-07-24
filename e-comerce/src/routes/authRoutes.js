const Router= require('express');
const router = Router();
const {loginPage,logoutUser,registerPage} = require('../controllers/authController');
const { forwardAuthenticated } = require('../middlewares/authMiddleware');
// const  validateUserRegistration = require('../middlewares/validationMiddleware');


router.get('/login', forwardAuthenticated, loginPage);
// Ruta GET para la página de registro
router.get('/register', forwardAuthenticated, registerPage);
router.post('/logout', logoutUser);

module.exports = router;
