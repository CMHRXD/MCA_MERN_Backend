//DB Manager
import mongoose from "mongoose";
//Hashing 
import bcrypt from "bcrypt";
//Helpers
import {idGenerator} from '../helpers/helpers_functions.js'

const doctorsTable = mongoose.Schema({
    name:{
        type:String,
        require: true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
    },
    cell:{
        type:String,
        default:null,
        trim:true
    },
    web:{
        type:String,
        default:null
    },
    token:{
        type:String,
        default: idGenerator()
    },
    validated:{
        type:Boolean,
        default:false
    }
});

doctorsTable.pre("save", async function(next){ //Password Hashing

    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Doctor = mongoose.model('Doctors', doctorsTable);

export default Doctor;