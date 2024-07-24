const Payment = require('../models/Payment');

const processPayment = async (req, res) => {
  const { amount, paymentMethod } = req.body;

  const newPayment = new Payment({
    amount,
    paymentMethod,
    user: req.user.id,
  });

  try {
    await newPayment.save();
    req.flash('success_msg', 'Payment successful');
    res.redirect('/dashboard');
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/payment');
  }
};

const viewPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id });
    res.render('payments', { payments });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
};

module.exports = {
  viewPayments,processPayment
}