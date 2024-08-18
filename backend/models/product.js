const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
   
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    new_price: { type: Number, required: true },
    sales: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    reviews: { type: [Number], default: [] },
},
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

   
   