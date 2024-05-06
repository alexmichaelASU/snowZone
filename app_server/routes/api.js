const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const ctrlAuth = require('../controllers/authentication');
const  jwt  = require('jsonwebtoken');


const auth = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: 'Token error' });
    }
   
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ error: 'Token invalid, authorization denied' });
        }
        
        req.user = decoded;
        
        next();
    });
};
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
router.get('/products/contact/:contact', apiController.getProductsByContact);
router.get('/products/theme/:theme/filters', apiController.getProductsByThemeAndFilters);
router.get('/products', apiController.getAllProducts);
router.get('/products/:id', apiController.getProductById);
router.post('/products', auth, upload.single('productImage'), apiController.createProduct);
router.put('/products/:id', auth, upload.single('productImage'),  apiController.updateProduct);
router.delete('/products/:id', apiController.deleteProduct);
router.delete('/products', apiController.deleteAllProducts);
router.get('/:email', ctrlAuth.getUserr)
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/wishlist', apiController.createWishlistItem);
router.get('/wishlist/:email', auth, apiController.getWishlistByEmail);
router.delete('/wishlist/:id', auth, apiController.deleteWishlistItem);

module.exports = router;