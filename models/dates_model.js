import mongoose from "mongoose";

const datesTable = mongoose.Schema({

    pacient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pacients',
        require: true,
    },

    date: {
        type: String,
        require: true,
    },
    
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
    },

}, { timestamps: true });

const Dates = mongoose.model('Dates', datesTable);
export default Dates;
