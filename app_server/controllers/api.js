const Product = require('../models/Product.js');
const fs = require('fs');
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

//Used for getting products by a certain theme
exports.getProductsByTheme = async (req, res, next) => {
    try {
        const theme = req.params.theme;

        const products = await Product.find({ theme });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found with the specified theme' });
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Controller function to get products by a required theme and optional filters
exports.getProductsByThemeAndFilters = async (req, res, next) => {
    try {
        // Extracting the theme from the URL parameters
        const theme = req.params.theme;

        // Extracting optional filters from query parameters
        const manufacturer = req.query.manufacturer;
        const condition = req.query.condition;
        const color = req.query.color;
        const size = req.query.size;

        // Constructing the filter object based on provided parameters
        const filters = { theme };
        if (manufacturer) {
            filters.manufacturer = manufacturer;
        }
        if (condition) {
            filters.condition = condition;
        }
        if (color) {
            filters.color = color;
        }
        if (size) {
            filters.size = size;
        }

        // Querying the database for products that match the filters
        const products = await Product.find(filters);

        // If no products are found, return a 404 response
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found with the specified filters' });
        }

        // Respond with the list of products
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};


//Used for post request , creates a product
exports.createProduct = async (req, res, next) => {
    try {
        // Create a new product using the request body
        const productData = req.body;
        
        //sets the productImage field
        if (req.file) {
            productData.productImage = req.file.path;
        }
        
        const newProduct = new Product(productData);
        
        const savedProduct = await newProduct.save();
        
        //responds with the saved product
        res.status(201).json(savedProduct);
    } catch (error) {
        
        next(error);
    }
};

//Used for post request, edits a product
exports.updateProduct = async (req, res, next) => {
    try {
        //checks if a new image file was uploaded
        if (req.file) {
            //stores path of the new image
            const newImagePath = req.file.path;
            
            //finds the product by ID and retrieve the existing product details
            const existingProduct = await Product.findById(req.params.id);

            if (!existingProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            //checks if the new image is different from the existing image
            if (existingProduct.productImage && existingProduct.productImage !== newImagePath) {
                //deletes the existing image file
                fs.unlink(existingProduct.productImage, (err) => {
                    if (err) {
                        console.error('Error deleting existing image:', err);
                    }
                });
            }

            //updatse the product image path in the request body
            req.body.productImage = newImagePath;
        }

        //updates the product with the new data from req.body
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        //responds with the updated product
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

//Used for delete request, deletes a product by id
exports.deleteProduct = async (req, res, next) => {
    try {
        // find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
		//grabs image path for deletion
        const imagePath = deletedProduct.productImage;

        // deletes the image file
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
            }
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

exports.deleteAllProducts = async (req, res, next) => {
    try {
        const allProducts = await Product.find({});

        allProducts.forEach(product => {
            const imagePath = product.productImage;
            
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
            });
        });

        await Product.deleteMany({});
        
        res.status(200).json({ message: 'All products and their images have been deleted' });
    } catch (error) {
        next(error);
    }
};
