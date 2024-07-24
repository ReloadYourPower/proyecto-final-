const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *   post:
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */

// GET /users
router.get('/', (req, res) => {
  // Implementación para obtener todos los usuarios
  res.status(200).json({ message: 'Lista de usuarios obtenida correctamente' });
});

// POST /users
router.post('/', (req, res) => {
  // Implementación para crear un nuevo usuario
  const { username, email } = req.body;
  // Validar datos y guardar en la base de datos
  res.status(201).json({ message: 'Usuario creado exitosamente' });
});

module.exports = router;
