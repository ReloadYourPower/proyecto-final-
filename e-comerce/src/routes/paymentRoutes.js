const Router = require('express');
const router = Router();
const {viewPaymentPage,processPayment} = require('../controllers/paymentController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, viewPaymentPage);

router.post('/', ensureAuthenticated,viewPaymentPage,processPayment
);
router.post('/success',ensureAuthenticated,async (req,res) => {
    res.render('success',{ user: req.user })
    
})

module.exports = router;
