const Router= require('express');
const router = Router();

const {getProducts,addProduct} = require('../controllers/productController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const {  ensureAdmin } = require('../middlewares/roleMiddleware');

router.get('/', getProducts);
router.post('/add', ensureAuthenticated, ensureAdmin, addProduct);

module.exports = router;
