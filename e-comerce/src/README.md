e-commerce/
├── config/
│   ├── config.js                # Configuración general
│   ├── db.js                    # Configuración de la base de datos
│   ├── multerConfig.js          # Configuración de Multer para la carga de archivos
│   └── passport.js              # Configuración de Passport (autenticación)
│
├── controllers/
│   ├── authController.js        # Controlador de autenticación
│   ├── cartControllers.js       # Controladores de carrito de compras
│   ├── paymentController.js     # Controlador de pagos
│   ├── productController.js     # Controlador de productos
│   ├── userController.js        # Controlador de usuarios
│   └── viewController.js        # Controlador de vistas
│
├── daos/
│   ├── implementations/
│   │   ├── cartDAO.js           # Implementación del DAO para carrito
│   │   ├── paymentDAO.js        # Implementación del DAO para pagos
│   │   ├── productDAO.js        # Implementación del DAO para productos
│   │   └── userDAO.js           # Implementación del DAO para usuarios
│   │
│   └── interfaces/
│       ├── ICartDAO.js          # Interfaz para DAO de carrito
│       ├── IPaymentDAO.js       # Interfaz para DAO de pagos
│       ├── IProductDAO.js       # Interfaz para DAO de productos
│       └── IUserDAO.js          # Interfaz para DAO de usuarios
│
├── dtos/
│   └── UserDTO.js               # DTO para usuarios
│
├── factories/
│   └── DAOFactory.js            # Fábrica para DAOs
│
├── logger/
│   └── logger.js                # Configuración del sistema de logs
│
├── middlewares/
│   ├── authMiddleware.js        # Middleware de autenticación
│   ├── errorMiddleware.js       # Middleware de manejo de errores
│   ├── purchaseMiddleware.js    # Middleware de validación de compra
│   ├── roleMiddleware.js        # Middleware de roles de usuario
│   └── validationMiddleware.js  # Middleware de validación de datos
│
├── models/
│   ├── Cart.js                  # Modelo para carrito
│   ├── Payment.js               # Modelo para pagos
│   ├── Product.js               # Modelo para productos
│   ├── Ticket.js                # Modelo para tickets
│   └── User.js                  # Modelo para usuarios
│
├── repositories/
│   └── ProductRepository.js     # Repositorio para productos
│
├── routes/
│   ├── swagger/
│   │   ├── cartSwa.js           # Definición Swagger para carrito
│   │   ├── productSwa.js        # Definición Swagger para productos
│   │   └── userSwa.js           # Definición Swagger para usuarios
│   │
│   ├── authRoutes.js            # Rutas de autenticación
│   ├── cartRoutes.js            # Rutas de carrito
│   ├── emailRoutes.js           # Rutas de correos electrónicos
│   ├── mockingRoutes.js         # Rutas de mockeo (pruebas)
│   ├── paymentRoutes.js         # Rutas de pagos
│   ├── productRoutes.js         # Rutas de productos
│   ├── ticketRoutes.js          # Rutas de tickets
│   ├── userRoutes.js            # Rutas de usuarios
│   └── viewRoutes.js            # Rutas de vistas
│
├── services/
│   ├── authService.js           # Servicio de autenticación
│   ├── cartService.js           # Servicio de carrito
│   ├── emailService.js          # Servicio de correos electrónicos
│   ├── paymentService.js        # Servicio de pagos
│   ├── productService.js        # Servicio de productos
│   ├── ticketService.js         # Servicio de tickets
│   ├── userService.js           # Servicio de usuarios
│   └── viewService.js           # Servicio de vistas
│
├── swagger/
│   └── swagger.js               # Configuración Swagger
│
├── test/
│   ├── auth.test.mjs            # Pruebas para autenticación
│   ├── cart.test.mjs            # Pruebas para carrito
│   ├── product.test.mjs         # Pruebas para productos
│   ├── session.test.mjs         # Pruebas para sesiones
│   └── utils.test.js            # Pruebas para utilidades
│
├── uploads/
│   ├── documents/
│   │   ├── bankStatement/      # Comprobantes de estado de cuenta
│   │   ├── identification/      # Identificaciones
│   │   └── proofOfAddress/      # Comprobantes de domicilio
│   ├── products/                # Imágenes de productos
│   └── profiles/                # Imágenes de perfil
│
├── utils/
│   ├── createProducts.js        # Utilidades para crear productos
│   ├── createUsers.js           # Utilidades para crear usuarios
│   └── mocking.js               # Utilidades para mockeo (pruebas)
│
├── views/
│   ├── layouts/
│   │   └── main.handlebars      # Layout principal
│   ├── viewsUtils/
│   │   └── utils.js             # Funciones útiles para vistas
│   ├── addProduct.handlebars    # Vista para añadir productos
│   ├── admin.handlebars         # Vista de administrador
│   ├── cart.handlebars          # Vista del carrito de compras
│   ├── dashboard.handlebars     # Vista del panel de control
│   ├── DTO.handlebars           # Vista para objetos de transferencia de datos
│   ├── error401.handlebars      # Vista de error 401 (no autorizado)
│   ├── error404.handlebars      # Vista de error 404 (no encontrado)
│   ├── index.handlebars         # Vista de inicio
│   ├── login.handlebars         # Vista de inicio de sesión
│   ├── mail.handlebars          # Vista para correos electrónicos
│   ├── payment.handlebars       # Vista de pagos
│   ├── products.handlebars      # Vista de productos
│   ├── profile.handlebars       # Vista de perfil de usuario
│   ├── register.handlebars      # Vista de registro
│   └── users.handlebars         # Vista de usuarios
│
├── .dockerignore                 # Archivos ignorados por Docker
├── .env                          # Variables de entorno
├── app.js                        # Punto de entrada de la aplicación
├── Dockerfile                    # Archivo de configuración de Docker
├── index.js                      # Archivo de entrada alternativo
├── package-lock.json             # Dependencias exactas del proyecto
├── package.json                  # Metadatos y scripts del proyecto
├── generateReadme.js             # Script para generar README
└── README.md                     # Documentación principal del proyecto
