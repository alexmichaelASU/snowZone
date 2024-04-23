const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

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
    cb(null, true); 
    /** 
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        
    } else {
        cb(new Error('image not jpeg or png'), false); 
    }
    */
};

const upload = multer({ 

    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter,
});



router.get('/products', apiController.getAllProducts);
router.get('/products/:id', apiController.getProductById);
router.post('/products', upload.single('productImage'), apiController.createProduct);
router.put('/products/:id', upload.single('productImage'),  apiController.updateProduct);
router.delete('/products/:id', apiController.deleteProduct);

module.exports = router;