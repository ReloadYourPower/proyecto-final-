const Router = require('express');
const router = Router();



const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const mockingRoutes = require('./routes/mockingRoutes');
const email =require('./routes/emailRoutes')
const payment =require('./routes/paymentRoutes')


router.use('/',require('./routes/viewRoutes'));
router.use('/profile',require('./routes/viewRoutes'));
router.use('/profile/dashboard',require('./routes/viewRoutes'));
router.use('/profile/products',productRoutes);
router.use('/', require('./routes/authRoutes'));
router.use('/profile/cart',require('./routes/cartRoutes'));
router.use('/profile/users',userRoutes);
router.use('/profile/users/premium', userRoutes);
router.use('/products/mocking', mockingRoutes);
router.use('/profile/payment',payment);
router.use('/email', email);

module.exports = router;

