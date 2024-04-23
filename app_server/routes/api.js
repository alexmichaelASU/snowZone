

//used for uploading image
const multer = require('multer');

const stroage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }, 
});

const fileFilter = (req, file, cb) => {
    // Reject anything that is not PNG or JPEG
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); 
    } else {
        cb(new Error('image not jpeg or png'), false); 
    }
};

const upload = multer({ 

    storage: stroage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
});

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');



router.get('/products', apiController.getAllProducts);
router.get('/products/:id', apiController.getProductById);
router.post('/products', upload.single('product.image'), apiController.createProduct);
router.put('/products/:id', upload.single('product.image'),  apiController.updateProduct);
router.delete('/products/:id', apiController.deleteProduct);

module.exports = router;