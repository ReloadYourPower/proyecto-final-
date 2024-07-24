const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carrito
 *   description: Operaciones relacionadas con el carrito de compras
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtener contenido del carrito
 *     tags: [Carrito]
 *     responses:
 *       200:
 *         description: Contenido del carrito obtenido correctamente
 */

// GET /cart
router.get('/', async (req, res) => {
    
  // Implementación para obtener el contenido del carrito
  res.status(200).json({ message: 'Contenido del carrito obtenido correctamente' });
});

module.exports = router;
