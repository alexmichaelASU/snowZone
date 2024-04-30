const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const ctrlAuth = require('../controllers/authentication');
var { expressjwt: jwt } = require("express-jwt");

const auth = jwt({
    secret: process.env.JWT_SECRET,          
    userProperty: 'payload',
    algorithms: ['HS512']                  
  });

//used for uploading image
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
		const now = new Date().toISOString(); 
		const date = now.replace(/:/g, '-'); 
		cb(null, date + file.originalname);
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

    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter,
});


router.get('/products/theme/:theme', apiController.getProductsByTheme);
router.get('/products/theme/:theme/filters', apiController.getProductsByThemeAndFilters);
router.get('/products', apiController.getAllProducts);
router.get('/products/:id', apiController.getProductById);
router.post('/products', upload.single('productImage'), apiController.createProduct);
router.put('/products/:id', upload.single('productImage'),  apiController.updateProduct);
router.delete('/products/:id', apiController.deleteProduct);
router.delete('/products', apiController.deleteAllProducts);
router.get('/:email', ctrlAuth.getUserr)
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;