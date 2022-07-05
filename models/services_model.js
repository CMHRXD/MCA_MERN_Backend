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
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        require: true,
    }
    }, {timestamps:true}    
);

const Services = mongoose.model('Services', servicesTable)
export default Services;