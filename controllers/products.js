const express = require('express');
const Product = require('../models/products');
const router = express.Router();
const seedData = require('../models/seedData');

// I 
router.get('/', async (req, res) => {
	const foundProducts = await Product.find({})
    res.render('products/index.ejs', {
        products: foundProducts
    });
});

// N 

router.get('/new', (req, res) => {
	res.render('products/new.ejs');
});


// D 
router.delete('/:id', async (req,res) => {
    await Product.findByIdAndRemove(req.params.id)
    res.redirect('/products')
})

// U
router.put('/:id', async (req,res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/products')
} )

// C 
router.post('/', (req, res) => {
    const createdProduct = new Product(req.body)
    createdProduct.save().then(res.redirect('/products'))
})

// E

router.get('/:id/edit', async (req, res) => {
    const foundProduct = await Product.findById(req.params.id)
    res.render('products/edit.ejs',{
        product: foundProduct
    })
})

// S 

router.get('/:id', async (req,res) => {
    const foundProduct = await Product.findById(req.params.id).exec()
    res.render('products/show.ejs', {
      product: foundProduct  
    })
} )

// Buy
router.post('/:id/buy', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product.qty > 0) {
      product.qty--;
      await product.save();
    }
    res.redirect(`/products/${product._id}`);
  });
// seed
router.get('/seed', async (req, res) => {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(seedData);
    res.send(createdProducts);
});
module.exports = router;