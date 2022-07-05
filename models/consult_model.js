import mongoose from "mongoose";

const cosultTable = mongoose.Schema({

    pacient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pacientes',
        require:true,
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctores',
        require:true,
    },
    services:{
        type: Array,
        require:true,
    },
    products:{
        type: Array,
        require:true,
    },

    date:{
        type: Date,
        require:true,
    },

    symptoms:{
        type: String,
        require:true,
    },

    treatment:{
        type: String,
        require:true,
    },
    total:{
        type: Number,
        require:true,
    }


}, {timestamps:true});

const Consults = mongoose.model('Consults', cosultTable)
export default Consults;