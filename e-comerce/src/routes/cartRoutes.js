const Router= require('express');
const router = Router();
const {addToCart, viewCart, updateCart,deleteCart,purchaseAndFilterCart} = require('../controllers/cartControllers');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const {checkProductOwner} =  require('../middlewares/roleMiddleware');
const {checkStock} =  require('../middlewares/purchaseMiddleware');


// Vista del carrito
router.get('/', ensureAuthenticated, viewCart);

// Agregar producto al carrito
router.post('/add/:productId', ensureAuthenticated,
    // middleware que detecta si un usuario premium agrega a el carrito un producto que el mismo creo
    checkProductOwner, 
    addToCart);


// Modificar cantidad de un producto en el carrito
router.post('/modify/:productId', ensureAuthenticated,updateCart );

// Eliminar producto del carrito
router.post('/delete/:productId', ensureAuthenticated,deleteCart)

// Comprar el carrito
router.post('/purchase/:cid', ensureAuthenticated,purchaseAndFilterCart);

module.exports = router;
