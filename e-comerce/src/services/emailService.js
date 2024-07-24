const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendEmail = async (to, subject, message) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html: message // Ahora usando HTML en lugar de texto plano
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el email:', error);
        throw error; // Lanza el error para manejarlo adecuadamente en otros lugares
    }
};


module.exports = {
    sendEmail
};








// // Simulación del envío de correos electrónicos
// const sendEmail = async (to, subject, message) => {
//     try {
//         // Imprimir el enlace en la consola en lugar de enviar un correo electrónico
//         console.log(`To: ${to}`);
//         console.log(`Subject: ${subject}`);
//         console.log(`Message: ${message}`);
//         console.log('Email enviado exitosamente (simulado)');
//     } catch (error) {
//         console.error('Error al enviar el email (simulado):', error);
//         throw error; // Lanza el error para manejarlo adecuadamente en otros lugares
//     }
// };