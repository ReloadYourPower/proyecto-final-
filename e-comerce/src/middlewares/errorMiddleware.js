// src/middlewares/errorMiddleware.js
const errorDictionary = require('./errorDictionary');

const handleError = (err, req, res, next) => {
  const statusCode = err.status || 500; // Usa el código de estado del error o 500 por defecto
  const error = errorDictionary[statusCode] || errorDictionary['500']; // Obtén el error del diccionario o usa el de 500 por defecto

  // Registra el error en la consola para propósitos de depuración
  console.error(`Error ${statusCode}: ${error.message}`, err);

  // Renderiza la vista de error con el mensaje y la descripción
  res.status(statusCode).render('error', {
    message: error.message,
    description: error.description
  });
};

module.exports = {
  handleError
};
