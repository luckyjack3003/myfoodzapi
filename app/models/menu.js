const mongoose = require('mongoose');
let menuSchema = new mongoose.Schema({
    url:String,
    name:String,
    price:String,
    discount:String,
    calories:String,
    fat:String,
    protein:String,
    carbs:String,
});

let Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;