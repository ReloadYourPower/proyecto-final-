const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ajusta la ruta según tu estructura de carpetas
const passport = require('passport');

const configurePassport = (passport) => {
  passport.use(
  
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      console.log('Autenticación iniciada');
      // Buscar usuario por email
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        console.log('Usuario encontrado:', user);
        // Comparar contraseña ingresada con la almacenada (hasheada)
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log('Error al comparar contraseñas:', err);
            throw err;
          }
          if (isMatch) {
            console.log('Contraseña correcta');
            return done(null, user);
          } else {
            console.log('Contraseña incorrecta');
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      }).catch(err => {
        console.log('Error al buscar usuario:', err);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

module.exports = configurePassport;
