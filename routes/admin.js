const express = require('express')
const path = require('path')
const rootDir = require('../util/path')

const adminController = require('../controllers/admin')

const router = express.Router();


router.get('/add-product',adminController.getAddProduct)

//Route paths can be thesame as long as the methods are different
router.post('/add-product',adminController.postAddProduct)

//For editing a product
router.get('/edit-product/:productId',adminController.getEditProduct)

//P0ST REQUEST FOR EDITING PRODUCTS
router.post('/edit-product',adminController.postEditProduct)

router.get('/products', adminController.getProducts)

router.post('/delete-product', adminController.postDeleteProduct)
// exports.routes = router;
// exports.products = products;

module.exports = router;