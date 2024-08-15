const Router= require('express');
const router = Router();

const {getProducts} = require('../controllers/productController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { addToCart} = require('../controllers/cartControllers');

router.get('/',ensureAuthenticated,getProducts);
router.post('/:productId',addToCart);

module.exports = router;
