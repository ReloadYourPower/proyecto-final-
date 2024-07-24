const PaymentDAO = require('../dao/implementations/paymentDAO');

class PaymentService {
  async processPayment(paymentData) {
    return await PaymentDAO.addPayment(paymentData);
  }

  async viewPayments(userId) {
    return await PaymentDAO.getAllPaymentsByUserId(userId);
  }
}

module.exports = new PaymentService();
