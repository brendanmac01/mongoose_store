const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
require('dotenv').config()
const app = express()


mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// controllers
const productsController = require('./controllers/products')
app.use('/products', productsController)

app.get('/', (req, res) => {
    res.redirect('/products');
  });

  

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));