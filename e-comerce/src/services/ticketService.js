const Ticket = require('../models/Ticket');
const { v4: uuidv4 } = require('uuid');

class TicketService {
    async createTicket(cart, user) {
        const ticket = new Ticket({
            code: uuidv4(),
            purchase_datetime: new Date(),
            amount: cart.totalAmount,
            purchaser: user.email
        });

        try {
            await ticket.save();
            return ticket;
        } catch (error) {
            console.error('Error creating ticket:', error);
            throw error;
        }
    }
}

module.exports = new TicketService();
