const errorDictionary = {
    '400': {
      message: 'La solicitud no se pudo procesar debido a una sintaxis incorrecta o datos inválidos.',
      description: 'Datos de entrada mal formateados, campos obligatorios faltantes.'
    },
    '401': {
      message: 'La solicitud requiere autenticación y no se ha proporcionado una autenticación válida.',
      description: 'Token de autenticación faltante o inválido.'
    },
    '403': {
      message: 'El servidor entendió la solicitud, pero se niega a autorizarla.',
      description: 'El usuario no tiene permisos suficientes para acceder al recurso.'
    },
    '404': {
      message: 'El recurso solicitado no se pudo encontrar en el servidor.',
      description: 'URL incorrecta, recurso eliminado o movido.'
    },
    '500': {
      message: 'Se produjo un error en el servidor al procesar la solicitud.',
      description: 'Errores de programación, fallos en el servidor.'
    }
  };
  
  module.exports = errorDictionary;