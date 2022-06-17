import mongoose from "mongoose";

const servicesTable = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    price:{
        type:Number,
        require:true,
    },
    description:{
        type:String,
        require:true,
        trim:true,
    }
    }, {timestamps:true}    
);

const Services = mongoose.model('Services', servicesTable)
export default Services;