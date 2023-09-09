const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:String,
    contact:Number
});

module.exports = mongoose.model('products',productSchema);