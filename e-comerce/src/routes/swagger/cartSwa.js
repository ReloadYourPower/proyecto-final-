const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del carrito
 *         user:
 *           type: string
 *           description: ID del usuario
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto
 *               productName:
 *                 type: string
 *                 description: Nombre del producto
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del carrito
 *       example:
 *         _id: "60d0fe4f5311236168a109ca"
 *         user: "60c72b2f9b1e8b3405d6c9c7"
 *         products:
 *           - productId: "60c72b2f9b1e8b3405d6c9c8"
 *             productName: "Laptop"
 *         date: "2023-07-24T12:34:56Z"
 *   requestBodies:
 *     CreateCart:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: ID del usuario
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto
 *               productName:
 *                 type: string
 *                 description: Nombre del producto
 *       example:
 *         user: "60c72b2f9b1e8b3405d6c9c7"
 *         products:
 *           - productId: "60c72b2f9b1e8b3405d6c9c8"
 *             productName: "Laptop"
 *     UpdateCart:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: ID del usuario
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto
 *               productName:
 *                 type: string
 *                 description: Nombre del producto
 *       example:
 *         user: "60c72b2f9b1e8b3405d6c9c7"
 *         products:
 *           - productId: "60c72b2f9b1e8b3405d6c9c8"
 *             productName: "Laptop"
 */

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Devuelve todos los carritos
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: Operación resuelta con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Cart"
 *       500:
 *         description: Error en el servidor
 *   post:
 *     summary: Crear un nuevo carrito
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requestBodies/CreateCart"
 *     responses:
 *       201:
 *         description: Carrito creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Devuelve un carrito por ID
 *     tags: [Carts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operación exitosa, devuelve el carrito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error en el servidor
 *   put:
 *     summary: Actualiza un carrito existente
 *     tags: [Carts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del carrito a modificar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requestBodies/UpdateCart"
 *     responses:
 *       200:
 *         description: Carrito actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 */

router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('user').populate('products.productId');
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { user, products } = req.body;
  const newCart = new Cart({
    user,
    products,
  });

  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('user').populate('products.productId');
    if (cart == null) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const { user, products } = req.body;

    if (user != null) cart.user = user;
    if (products != null) cart.products = products;

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
