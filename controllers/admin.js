const Product = require('../models/product')


exports.getAddProduct = (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','add-product.html'))
    res.render('admin/edit-product',{pageTitle: 'Add-Product',path: '/admin/add-product',editing:false})
    // res.render('add-product',{pageTitle: 'Add New Product'})
}

exports.postAddProduct = (req,res,next)=> {
    // products.push({title: req.body.title})
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const product = new Product(title,price,description,imageUrl);
    product.save().then(result => {
        res.redirect('/admin/add-product');
    }).catch(err => {
        console.log(err)
    });
}

exports.getEditProduct = (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','add-product.html'))
    const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        if(!product){
            res.redirect('/')
        }
        res.render('admin/edit-product',
        {
            pageTitle: 'Add-Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    }).catch(err => {
        console.log(err)
    })
    // res.render('add-product',{pageTitle: 'Add New Product'})
}

exports.postEditProduct = (req,res,next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findById(prodId).then(productData => {
        const updatedProduct = new Product(updatedTitle,updatedPrice,updatedDesc,updatedImageUrl,prodId)
        updatedProduct.save().then(() => {
            res.redirect('/admin/products')
        }).catch(err =>{
            console.log(err)
        });
    }).catch(err => console.log(err))
   
}

exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId).then(() => {
        res.redirect('/admin/products')
    }).catch(err => {
        console.log(err)
    })
}

exports.getProducts = (req,res,next) => {

    Product.fetchAll().then(products => {
        res.render('admin/products',{prods: products,pageTitle: 'Admin Products',path: '/admin/products'})
    }).catch(err => {
        console.log(err)
    })
}

