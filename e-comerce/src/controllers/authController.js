
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const UserDTO = require('../dtos/UserDTO');
const nodemailer = require('nodemailer');
const crypto = require('crypto');



const transporter = nodemailer.createTransport({
  service:config.emailService,
  auth: {
      user: config.emailUser,
      pass: config.emailPass
  }
});
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Invalid token' });
    }
};
const registerUser = async (req, res) => {
  console.log('Register user endpoint hit');
  console.log('Request body:', req.body);
  const { name, email, password, password2 } = req.body;
  console.log('Received data:::', name, email, password, password2);

  let errors = [];

  // Validaciones
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  }

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email: email });
    if (user) {
      errors.push({ msg: 'Email already exists' });
      return res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    }

    // Crear un nuevo usuario
    const newUser = new User({ name, email, password });

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    // Guardar el usuario en la base de datos
    await newUser.save();
    console.log('Nuevo usuario guardado:', newUser);

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/login');
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    errors.push({ msg: 'An error occurred while registering the user' });
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  }
};

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('User not found');

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const mailOptions = {
      to: user.email,
      from: config.emailUser,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://${req.headers.host}/reset/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).send('Email could not be sent');
      res.send('Recovery email sent');
  });
};

const resetPassword = async (req, res) => {
  const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) return res.status(400).send('Password reset token is invalid or has expired');

  if (req.body.password === user.password) return res.status(400).send('New password must be different from the old password');

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.send('Password has been reset');
};
const sendPasswordReset = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).send('User with that email does not exist');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
        to: user.email,
        from: config.emailUser,
        subject: 'Password Reset',
        text: `Please click on the following link to reset your password: http://${req.headers.host}/reset/${token}`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send('Recovery email sent');
    });
};


const currentUser = (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.send(userDTO);
};

const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    user.last_connection = new Date();
    await user.save();

    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.clearCookie('connect.sid', { path: '/' });
        res.redirect('/login');
      });
    });
  } catch (error) {
    next(error);
  }
};

// const logoutUser = (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       req.flash('error_msg', 'Error logging out');
//       return res.redirect('/');
//     }
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/login');
//   });
// };
const loginPage = (req, res) => {
  res.render('login');
};

const registerPage = (req, res) => {
  res.render('register');
};
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    req.user.role ='premium'
      if (req.user.role !== requiredRole || 'premium') {
          return res.status(403).send('Permission Denied');
      }
      next();
  };
}



module.exports = {
  registerPage, registerUser, loginPage, logoutUser,currentUser,authMiddleware,forgotPassword, sendPasswordReset, resetPassword, roleMiddleware
};
