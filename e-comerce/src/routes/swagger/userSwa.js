const express = require('express');
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Dirección de email
 *         password:
 *           type: string
 *           description: Contraseña
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         role:
 *           type: string
 *           enum: [user, premium, admin]
 *           description: Rol del usuario
 *         resetPasswordToken:
 *           type: string
 *           description: Token para resetear la contraseña
 *         resetPasswordExpires:
 *           type: string
 *           format: date-time
 *           description: Fecha de expiración del token de reseteo
 *         documents:
 *           type: object
 *           properties:
 *             identification:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del documento de identificación
 *                 reference:
 *                   type: string
 *                   description: Referencia del documento de identificación
 *             proofOfAddress:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del documento de prueba de domicilio
 *                 reference:
 *                   type: string
 *                   description: Referencia del documento de prueba de domicilio
 *             bankStatement:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del documento de estado de cuenta bancario
 *                 reference:
 *                   type: string
 *                   description: Referencia del documento de estado de cuenta bancario
 *         last_connection:
 *           type: string
 *           format: date-time
 *           description: Última conexión del usuario
 *       example:
 *         _id: "6676dc4649bc71d8a40471a0"
 *         name: Pepito Pérez
 *         email: pepito@gmail.com
 *         password: pepito123
 *         date: "2023-07-24T12:34:56Z"
 *         role: user
 *         resetPasswordToken: null
 *         resetPasswordExpires: null
 *         documents:
 *           identification:
 *             name: DNI
 *             reference: 12345678
 *           proofOfAddress:
 *             name: Factura
 *             reference: ABC123
 *           bankStatement:
 *             name: Estado de Cuenta
 *             reference: 987654321
 *         last_connection: "2023-07-24T12:34:56Z"
 *   requestBodies:
 *     CreateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Dirección de email
 *         password:
 *           type: string
 *           description: Contraseña
 *         role:
 *           type: string
 *           enum: [user, premium, admin]
 *           description: Rol del usuario
 *         documents:
 *           type: object
 *           properties:
 *             identification:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del documento de identificación
 *                 reference:
 *                   type: string
 *                   description: Referencia del documento de identificación
 *             proofOfAddress:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del documento de prueba de domicilio
 *                 reference:
 *                   type: string
 *                   description: Referencia del documento de prueba de domicilio
 *             bankStatement:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del documento de estado de cuenta bancario
 *                 reference:
 *                   type: string
 *                   description: Referencia del documento de estado de cuenta bancario
 *         last_connection:
 *           type: string
 *           format: date-time
 *           description: Última conexión del usuario
 *       example:
 *         name: Pepito Pérez
 *         email: pepito@gmail.com
 *         password: pepito123
 *         role: user
 *         documents:
 *           identification:
 *             name: DNI
 *             reference: 12345678
 *           proofOfAddress:
 *             name: Factura
 *             reference: ABC123
 *           bankStatement:
 *             name: Estado de Cuenta
 *             reference: 987654321
 *         last_connection: "2023-07-24T12:34:56Z"
 *     UpdateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Dirección de email
 *         password:
 *           type: string
 *           description: Contraseña
 *         role:
 *           type: string
 *           enum: [user, premium, admin]
 *           description: Rol del usuario
 *         documents:
 *           type: object
 *           properties:
 *             identification:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del documento de identificación
 *                 reference:
 *                   type: string
 *                   description: Referencia del documento de identificación
 *             proofOfAddress:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del documento de prueba de domicilio
 *                 reference:
 *                   type: string
 *                   description: Referencia del documento de prueba de domicilio
 *             bankStatement:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del documento de estado de cuenta bancario
 *                 reference:
 *                   type: string
 *                   description: Referencia del documento de estado de cuenta bancario
 *         last_connection:
 *           type: string
 *           format: date-time
 *           description: Última conexión del usuario
 *       example:
 *         name: Pepito Pérez
 *         email: pepito@gmail.com
 *         password: pepito123
 *         role: premium
 *         documents:
 *           identification:
 *             name: DNI
 *             reference: 12345678
 *           proofOfAddress:
 *             name: Factura
 *             reference: ABC123
 *           bankStatement:
 *             name: Estado de Cuenta
 *             reference: 987654321
 *         last_connection: "2023-07-24T12:34:56Z"
 */

/**
 * @swagger
 * /profile/users:
 *   get:
 *     summary: Devuelve todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Operación resuelta con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       500:
 *         description: Error en el servidor
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requestBodies/CreateUser"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */

/**
 * @swagger
 * /profile/users/{uid}:
 *   get:
 *     summary: Devuelve un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operación exitosa, devuelve el usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: Usuario no encontrado en el sistema
 *       500:
 *         description: Error en el servidor
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         description: ID del usuario a modificar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requestBodies/UpdateUser"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *        400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 */

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, email, password, role, documents } = req.body;
  const newUser = new User({
    name,
    email,
    password,
    role,
    documents,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:uid', async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (user == null) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:uid', async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (user == null) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { name, email, password, role, documents } = req.body;

    if (name != null) user.name = name;
    if (email != null) user.email = email;
    if (password != null) user.password = password;
    if (role != null) user.role = role;
    if (documents != null) user.documents = documents;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;