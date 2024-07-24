const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ajusta la ruta según tu estructura de proyecto

const usersData = [
  { name: 'User 1', email: 'user1@example.com', password: 'password1', role: 'user' },
  { name: 'User 2', email: 'user2@example.com', password: 'password2', role: 'user' },
  { name: 'User 3', email: 'user3@example.com', password: 'password3', role: 'user' },
  { name: 'User 4', email: 'user4@example.com', password: 'password4', role: 'user' },
  { name: 'User 5', email: 'user5@example.com', password: 'password5', role: 'user' },
  { name: 'User 6', email: 'user6@example.com', password: 'password6', role: 'user' },
  { name: 'User 7', email: 'user7@example.com', password: 'password7', role: 'user' },
  { name: 'User 8', email: 'user8@example.com', password: 'password8', role: 'user' },
  { name: 'User 9', email: 'user9@example.com', password: 'password9', role: 'user' },
  { name: 'User 10', email: 'user10@example.com', password: 'password10', role: 'user' },
  { name: 'User 11', email: 'user11@example.com', password: 'password11', role: 'user' },
  { name: 'User 12', email: 'user12@example.com', password: 'password12', role: 'user' },
  { name: 'User 13', email: 'user13@example.com', password: 'password13', role: 'user' },
  { name: 'User 14', email: 'user14@example.com', password: 'password14', role: 'user' },
  { name: 'User 15', email: 'user15@example.com', password: 'password15', role: 'user' },
];

const initializeUsers = async () => {
  try {
    // Verifica si ya existen usuarios en la base de datos
    const usersCount = await User.countDocuments();
    if (usersCount === 0) {
      // Cifra las contraseñas antes de guardar los usuarios
      for (let userData of usersData) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;
      }

      // Inserta los usuarios
      await User.insertMany(usersData);
      console.log('Usuarios iniciales creados');
    } else {
      console.log('Usuarios ya existen en la base de datos');
    }
  } catch (error) {
    console.error('Error inicializando usuarios:', error);
  }
};

module.exports = {initializeUsers}
