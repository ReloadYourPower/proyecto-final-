const Router= require('express');
const router = Router();
// Ruta de prueba para crear ticket
router.post('/test-ticket', async (req, res) => {
    const { cart, user } = req.body;
    try {
        const ticket = await ticketService.createTicket(cart, user);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).send('Error creating ticket');
    }
});
module.exports = router;