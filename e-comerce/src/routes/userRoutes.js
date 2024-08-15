const Router= require('express');
const router = Router();

const {getUsers,getUserById,updateUser,deleteUser,getCurrentUser,toggleUserRole,deleteInactiveUsers} = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { ensureAdmin } = require('../middlewares/roleMiddleware');
const upload = require('../config/multerConfig');
const {uploadDocuments,uploadProfileImage,uploadProductImage} = require('../controllers/userController');
const methodOverride = require('method-override');

// Middleware para override methods
router.use(methodOverride('_method'));
router.post('/', ensureAdmin,getUsers);
router.post('/current',  ensureAdmin,getCurrentUser);

// Ruta para actualizar a premium
// router.put('/premium/:uid', ensureAuthenticated, ensureAdmin, toggleUserRole);

router.patch('/premium/:uid',toggleUserRole);

router.get('/', 
  ensureAuthenticated, 
  ensureAdmin,
   getUsers);

// Obtener un usuario por ID
router.get('/:id', ensureAuthenticated, ensureAdmin, getUserById);

// Actualizar un usuario
router.post('/update/:id',updateUser);

// Ruta para actualizar a premium
router.post('/premium/:uid',toggleUserRole);

// Eliminar un usuario
router.post('/delete/:id', deleteUser);

// Eliminar todos los usuarios que no se conectaran en los ultimos 30 minutos
router.delete('/profile/users/delete-inactive', deleteInactiveUsers);


// Ruta para subir documentos
// Ruta para subir documentos
router.post('/:uid/documents', upload.fields([
  { name: 'identification', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 },
  { name: 'bankStatement', maxCount: 1 }
]), uploadDocuments);
// Ruta para mostrar el formulario de subida de documentos
router.get('/:uid/documents', (req, res) => {
  res.render('uploadDocuments', { userId: req.params.uid });
});

// Ruta para subir imagen de perfil
router.post('/:uid/profileImage', upload.single('profileImage'), uploadProfileImage);

// Ruta para subir imagen de producto
router.post('/:uid/productImage', upload.single('productImage'), uploadProductImage);


module.exports = router;
