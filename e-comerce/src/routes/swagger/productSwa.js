const Router = require('express');
const router = Router();
const Product = require('../../models/Product');



/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Operaciones relacionadas con los productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del producto
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 */

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Obtener todos los productos desde la base de datos
    const swaProducts = products.map(product => product.toObject()); // Convertir a objetos si es necesario
    res.status(200).json(swaProducts); // Devolver la lista de productos como JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
