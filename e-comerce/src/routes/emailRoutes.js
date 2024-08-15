const Router= require('express');
const router = Router();
const { forwardAuthenticated } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService'); // Ajusta la ruta según tu estructura de proyecto
const crypto = require('crypto');
const bcrypt = require('bcrypt');
// Ruta de prueba para enviar correo electrónico


// Ruta para mostrar el formulario de recuperación de contraseña
router.get('/', forwardAuthenticated,(req, res) => {
    res.render('mail', { title: 'Recuperar Contraseña' });
});

// Ruta para procesar el formulario de recuperación de contraseña
router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.error('Error: Usuario no encontrado');
            return res.status(404).send('Usuario no encontrado. Revisa la consola.');
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

        await user.save();

        const resetUrl = `http://${req.headers.host}/email/reset/${token}`;
        const message = `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetUrl}`;

        await sendEmail(user.email, 'Recuperación de Contraseña', message);

        res.status(200).send('Email enviado. Revisa tu bandeja de entrada.');
    } catch (error) {
        console.error('Error al solicitar el restablecimiento de la contraseña:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});


router.get('/reset/:token', async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).render('link-expired', { email: req.query.email }); }

        res.render('reset-password', { token: req.params.token });
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

router.post('/reset/:token', async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).send('El enlace de restablecimiento de contraseña es inválido o ha expirado.');
        }

        const { password } = req.body;

        const isSamePassword = await user.comparePassword(password);
        if (isSamePassword) {
            return res.status(400).send('No puedes usar la misma contraseña.');
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).send('Contraseña restablecida con éxito.');
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

module.exports = router;