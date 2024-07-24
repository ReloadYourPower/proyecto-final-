require('dotenv').config();

module.exports = {
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    emailService: process.env.EMAIL_SERVICE,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS
};

