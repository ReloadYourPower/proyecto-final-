const User = require('../models/User');
const UserDTO = require('../dtos/UserDTO');


const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    };

    const users = await User.paginate({}, options);

  
    const userData = users.docs.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }));

    res.render('users', {
      users: userData,
      page: users.page,
      totalPages: users.totalPages,
      user: req.user
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
};




const getCurrentUser = (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.render('DTO',{ userDTO });
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/users');
    }
    res.render('profile', { user });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/users');
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/users');
    }
    req.flash('success_msg', 'User updated');
    res.redirect('/users');
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/users');
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      req.flash('error_msg', 'User not found');
      console.log(`User with ID ${userId} not found`);
      return res.status(404).json({ message: 'User not found' });
    }
    req.flash('success_msg', 'User deleted');
    console.log(`User with ID ${userId} deleted`); // Mensaje de depuración
    return res.status(404).json({ message: 'User delete' });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    console.error(`Server error: ${err}`); // Mensaje de depuración
    return res.status(404).json({ message: 'error del servidor' });
  }
};
const deleteInactiveUsers = async (req, res) => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const users = await User.find({ lastActive: { $lt: thirtyMinutesAgo } });

    if (users.length === 0) {
      req.flash('error_msg', 'No inactive users found');
      return res.status(404).json({ message: 'No inactive users found' });
    }

    for (const user of users) {
      await User.findByIdAndDelete(user._id);
      const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: user.email,
        subject: 'Cuenta eliminada por inactividad',
        text: `Hola ${user.name}, tu cuenta ha sido eliminada por inactividad.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending email to ${user.email}: ${error}`);
        } else {
          console.log(`Email sent to ${user.email}: ${info.response}`);
        }
      });

      console.log(`User with ID ${user._id} deleted`);
    }

    req.flash('success_msg', 'All inactive users deleted');
    return res.status(200).json({ message: 'All inactive users deleted' });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    console.error(`Server error: ${err}`);
    return res.status(500).json({ message: 'Server error' });
  }
};

const toggleUserRole = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el usuario ha cargado los documentos requeridos
    const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
    const uploadedDocuments = user.documents.map(doc => doc.name);
    const hasAllDocuments = requiredDocuments.every(doc => uploadedDocuments.includes(doc));

    if (!hasAllDocuments) {
      return res.status(400).json({ message: 'El usuario no ha cargado todos los documentos requeridos' });
    }

    // Actualizar el rol del usuario
    user.role = user.role === 'user' ? 'premium' : 'user';
    await user.save();

    res.json({ message: 'Rol del usuario actualizado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el rol del usuario', error });
  }
};



// Controlador para actualizar a premium
const updateUserToPremium = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
    const userDocuments = user.documents.map(doc => doc.name);
    const hasAllDocuments = requiredDocuments.every(doc => userDocuments.includes(doc));

    if (!hasAllDocuments) {
      return res.status(400).json({ message: 'El usuario no ha subido todos los documentos requeridos' });
    }

    user.role = user.role === 'user' ? 'premium' : 'user';
    await user.save();

    res.status(200).json({ message: 'Rol de usuario actualizado correctamente', role: user.role });
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el rol del usuario', error });
  }
};

// Controlador para subir documentos

const uploadDocuments = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const files = req.files; // req.files es un objeto con los campos y archivos

    if (!files) {
      return res.status(400).json({ message: 'No se han subido archivos' });
    }

    // Guardar documentos subidos
    if (files['identification']) {
      user.documents.push({
        name: files['identification'][0].originalname,
        reference: files['identification'][0].path,
        type: 'identification'
      });
    }
    if (files['proofOfAddress']) {
      user.documents.push({
        name: files['proofOfAddress'][0].originalname,
        reference: files['proofOfAddress'][0].path,
        type: 'proofOfAddress'
      });
    }
    if (files['bankStatement']) {
      user.documents.push({
        name: files['bankStatement'][0].originalname,
        reference: files['bankStatement'][0].path,
        type: 'bankStatement'
      });
    }

    await user.save();
    res.status(200).json({ message: 'Documentos subidos y usuario actualizado', documents: user.documents });
  } catch (error) {
    console.error('Error al subir documentos:', error);
    res.status(500).json({ message: 'Error al subir documentos', error });
  }
};
const uploadProfileImage = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido archivo' });
    }

    user.profileImage = {
      name: req.file.originalname,
      reference: req.file.path,
    };

    await user.save();
    res.status(200).json({ message: 'Imagen de perfil subida y usuario actualizado', profileImage: user.profileImage });
  } catch (error) {
    console.error('Error al subir imagen de perfil:', error);
    res.status(500).json({ message: 'Error al subir imagen de perfil', error });
  }
};

const uploadProductImage = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido archivo' });
    }

    user.productImage = {
      name: req.file.originalname,
      reference: req.file.path,
    };

    await user.save();
    res.status(200).json({ message: 'Imagen de producto subida y usuario actualizado', productImage: user.productImage });
  } catch (error) {
    console.error('Error al subir imagen de producto:', error);
    res.status(500).json({ message: 'Error al subir imagen de producto', error });
  }
};




module.exports = {
deleteInactiveUsers,uploadProductImage,uploadProfileImage,updateUserToPremium,uploadDocuments,deleteUser,updateUser,getUserById,getUsers,getCurrentUser,toggleUserRole,
}





// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     const userData = users.map(user => ({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role
//     }));
//     res.render('users', { users: userData, user: req.user });
//   } catch (err) {
//     req.flash('error_msg', 'Server error');
//     res.redirect('/');
//   }
// };