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
    }

}, { timestamps: true });

const Dates = mongoose.model('Dates', datesTable);
export default Dates;
