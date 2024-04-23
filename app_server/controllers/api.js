const Product = require('../models/Product.js');

//used for uploading and storing images


//Used for Get Request
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

//Used for get request for a single product
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

//Used for post request , creates a product
exports.createProduct = async (req, res, next) => {
    try {
        console.log(req.file);
        // Create a new product using the request body
        const productData = req.body;
        
        // If an image file was uploaded, set the productImage field
        if (req.file) {
            productData.productImage = req.file.path;
        }
        
        // Create a new product instance with the provided data
        const newProduct = new Product(productData);
        
        // Save the new product to the database
        const savedProduct = await newProduct.save();
        
        // Respond with the saved product
        res.status(201).json(savedProduct);
    } catch (error) {
        // Handle unique constraint error for product name
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Product name must be unique' });
        }
        // Forward other errors to the error handler
        next(error);
    }
};
//Used for post request, edits a product
exports.updateProduct = async (req, res, next) => {
    try {
        // Check if an image file was uploaded and set the productImage field accordingly
        if (req.file) {
            // Update the req.body object with the path of the uploaded file
            req.body.productImage = req.file.path;
        }

        // Find the product by ID and update it with the new data from req.body
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If the product is not found, return a 404 error
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Respond with the updated product
        res.status(200).json(updatedProduct);
    } catch (error) {
        // Forward the error to the error handler
        next(error);
    }
};

//Used for delete request, deletes a product by id
exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};