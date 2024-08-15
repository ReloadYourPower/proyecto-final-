const Router = require('express');
const router = Router();
const Product = require('../../models/Product');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del producto
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         category:
 *           type: string
 *           description: Categoría del producto
 *         stock:
 *           type: integer
 *           description: Cantidad en stock
 *         dateAdded:
 *           type: string
 *           format: date-time
 *           description: Fecha en que se añadió el producto
 *       example:
 *         _id: "60d0fe4f5311236168a109ca"
 *         name: "Laptop"
 *         description: "Laptop de alta gama"
 *         price: 1299.99
 *         category: "Electronics"
 *         stock: 50
 *         dateAdded: "2023-07-24T12:34:56Z"
 *   requestBodies:
 *     CreateProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         category:
 *           type: string
 *           description: Categoría del producto
 *         stock:
 *           type: integer
 *           description: Cantidad en stock
 *       example:
 *         name: "Laptop"
 *         description: "Laptop de alta gama"
 *         price: 1299.99
 *         category: "Electronics"
 *         stock: 50
 *     UpdateProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         category:
 *           type: string
 *           description: Categoría del producto
 *         stock:
 *           type: integer
 *           description: Cantidad en stock
 *       example:
 *         name: "Laptop"
 *         description: "Laptop de alta gama"
 *         price: 1199.99
 *         category: "Electronics"
 *         stock: 30
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Devuelve todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Operación resuelta con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 *       500:
 *         description: Error en el servidor
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requestBodies/CreateProduct"
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Devuelve un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operación exitosa, devuelve el producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a modificar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requestBodies/UpdateProduct"
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 */

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    stock,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const { name, description, price, category, stock } = req.body;

    if (name != null) product.name = name;
    if (description != null) product.description = description;
    if (price != null) product.price = price;
    if (category != null) product.category = category;
    if (stock != null) product.stock = stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

