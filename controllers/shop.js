// const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req,res,next)=> {
    Product.fetchAll().then(products => {
        res.render('shop/product-list',{prods: products,pageTitle: 'Shop',path: '/products'})
    }).catch(err => {
        console.log(err)
    });
};

exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        res.render('shop/product-detail',{product: product, pageTitle: 'product-detail', path: '/products'})
    }).catch(err => console.log(err))
}
//My Pactice controllers

exports.getCart = (req,res,next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductsData = cart.products.find(prod => prod.id === product.id);
                if(cartProductsData){
                    cartProducts.push({productData: product, qty: cartProductsData.qty})
                }
            }
            res.render('shop/cart',{
                path: '/cart',
                pageTitle: 'Your Card',
                products: cartProducts
            })
        })
    })
}

exports.postCart = (req,res,next) => {
    const prodId =  req.body.productId;
    Product.findById(prodId,(product) => {
        Cart.addProduct(prodId,product.price)
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId,product => {
        Cart.deleteProduct(prodId,product.price)
        res.redirect('/cart')
    })

};

exports.getIndex = (req,res,next) => {
    Product.fetchAll().then(products => {
        // console.log('in render')
        // console.log(products)
        res.render('shop/index',{prods: products,pageTitle: 'Shop',path: '/'})
    }).catch(err => {
        console.log(err)
    })
}

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{path:'/checkout',pageTitle: 'Checkout'})
}

exports.getOrders = (req,res,next) => {
    res.render('shop/orders', {path: '/orders', pageTitle: 'Orders'})
}