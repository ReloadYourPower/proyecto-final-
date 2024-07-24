const multer = require('multer');
const path = require('path');


// Configuración de destino y nombre del archivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    if (file.fieldname === 'profileImage') {
      uploadPath = 'uploads/profiles/';
    } else if (file.fieldname === 'productImage') {
      uploadPath = 'uploads/products/';
    } else {
      switch (file.fieldname) {
        case 'identification':
          uploadPath = 'uploads/documents/identification/';
          break;
        case 'proofOfAddress':
          uploadPath = 'uploads/documents/proofOfAddress/';
          break;
        case 'bankStatement':
          uploadPath = 'uploads/documents/bankStatement/';
          break;
        default:
          uploadPath = 'uploads/documents/';
      }
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
module.exports = upload;
