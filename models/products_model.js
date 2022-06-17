import mongoose from "mongoose";

const productsTable = mongoose.Schema({
    
    name: {
        type: String,
        require: true,
        trim: true,
    },

    price: {
        type: Number,
        require: true,
    },

    description: {
        type: String,
        require: true,
        trim: true,
    },

    stock: {
        type: Number,
        require: true,
    },
    
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        require: true,
    }

    }, { timestamps: true }

);

const Products = mongoose.model("Products", productsTable);

export default Products;