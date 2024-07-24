const Payment = require('../../models/Payment');

class PaymentDAO {
  async getAllPaymentsByUserId(userId) {
    return await Payment.find({ user: userId });
  }

  async addPayment(payment) {
    const newPayment = new Payment(payment);
    return await newPayment.save();
  }

  async deletePayment(id) {
    return await Payment.findByIdAndDelete(id);
  }
}

module.exports = new PaymentDAO();
