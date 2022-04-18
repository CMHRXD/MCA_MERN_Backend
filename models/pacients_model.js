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
    email:{
        type: String,
        require:true,
        unique:true,
    },
    consult_date:{
        type: Date,
        require:true,
        default: Date.now(),
    },
    symptom:{
        type: String,
        require:true,
    },
    
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
    },
}, {timestamps:true}

);

const Pacients = mongoose.model('Pacientes', pacientsTable)

export default Pacients;