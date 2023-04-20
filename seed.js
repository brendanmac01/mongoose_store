const mongoose = require("mongoose")
const Product = require('./models/products.js')
const seedData = require('./models/seedData.js')
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

const seedProductsDB = async () => {
        await Product.deleteMany({})
    	await Product.insertMany(seedData)
    }

seedProductsDB().then( () => {
   mongoose.connection.close()
})