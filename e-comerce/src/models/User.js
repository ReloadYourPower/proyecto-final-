const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'premium', 'admin'],
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  documents: [{
   
    identification: {
      name: String,
      reference: String,
    },
    proofOfAddress: {
      name: String,
      reference: String,
    },
    bankStatement: {
      name: String,
      reference: String,
    }
  }],
  last_connection: Date,
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
