const ProductDAO = require('../daos/ProductDAO');
// Importar otros DAOs
const UserDAO = require('../daos/UserDAO'); // Ejemplo de otro DAO
const CartDAO = require('../daos/CartDAO'); // Ejemplo de otro DAO

class DAOFactory {
    static getDAO(type) {
        switch (type) {
            case 'product':
                return new ProductDAO();
            case 'user':
                return new UserDAO(); // Ejemplo de otro DAO
            case 'cart':
                return new CartDAO(); // Ejemplo de otro DAO
            // Otros casos para otros DAOs
            default:
                throw new Error('DAO type not supported');
        }
    }
}

module.exports = DAOFactory;
