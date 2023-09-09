const mongoose = require('mongoose');

// const main = async ()=>{
//     await mongoose.connect("mongodb://127.0.0.1:27017/bitsmart");
//     const ProductSchema = new mongoose.Schema({
//         name:String
//     });
//     const ProductModel = mongoose.model('cruds',ProductSchema);
//     let data = new ProductModel({name:"Ram"});
//     let res = await data.save();
//     console.log(res);
// }
// main();



mongoose.connect('mongodb://127.0.0.1:27017/bitsmart');
const productSchema = new mongoose.Schema({
    name: String,
    contact: Number
});

const saveInDB = async () => {
    const Product = mongoose.model('products', productSchema);
    let data = new Product({
        name: "Rahul Singh",
        contact: 998866
    });
    const result = await data.save();
    console.log(result);
}
// saveInDB();

const updateInDB =async  () => {
    const Product = mongoose.model('products', productSchema);
    let data =await  Product.updateOne(
        { name: "Rahul Singh" },
        {
            $set: { contact: "956458" }
        }
    )
    console.log(data)
}
// updateInDB();

const deleteInDB = async ()=>{
    const Product = mongoose.model('products', productSchema);
    let data = await Product.deleteOne({name:'Aditya'})
    console.log(data);
}
// deleteInDB();

const findInDB = async ()=>{
    const Product = mongoose.model('products', productSchema);
    let data = await Product.find({name:'Rahul Singh'})
    console.log(data);
}
findInDB()
