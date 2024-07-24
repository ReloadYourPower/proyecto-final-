const Router = require('express');
const router = Router();
const {viewPayments,processPayment} = require('../controllers/paymentController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, viewPayments);
router.post('/process', ensureAuthenticated, processPayment);

module.exports = router;
