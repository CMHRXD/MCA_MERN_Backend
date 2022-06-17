import mongoose from "mongoose";

const pacientsTable = mongoose.Schema({

    c_i:{
        type: String,
        require:true,
        trim: true,
        unique:true,
    },
    name:{
        type: String,
        require:true,
    },
    phone:{
        type: String,
        require:true,
    },

    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
    },
}, {timestamps:true});

const Pacients = mongoose.model('Pacients', pacientsTable)

export default Pacients;