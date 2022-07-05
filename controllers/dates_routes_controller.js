import Dates from "../models/dates_model.js";
import Pacients from "../models/pacients_model.js";

const createDate = async(req, res) => {
    const pacients = await Pacients.find();
    const date = new Dates(req.body);
    date.doctor = req.doctor;
    date.save()
        .then(date => {
            res.json({
                _id: date._id,
                pacient: pacients.find( pacient => pacient._id.toString() === date.pacient.toString()).name,
                date: date.date,
            });
        })
        .catch(err => res.json({ msg: err }))
}

const getDates = async (req, res) => {
    const pacients = await Pacients.find();
    Dates.find().where("doctor").equals(req.doctor)
        .then(dates => {
            dates = dates.map(date => {
                return{
                    _id: date._id,
                    pacient: pacients.find( pacient => pacient._id.toString() === date.pacient.toString()).name,
                    date: date.date,
                }
            })
            res.json(dates)
        })
        .catch(err => res.json({ msg: err }))
}

const getOneDate = (req, res) => {
    Dates.findById(req.params.id).where("doctor").equals(req.doctor)
        .then(date => {
            if (!date) return res.json({ msg: "No se encontro la Cita" })
            res.json(date)
        })
        .catch(err => res.json({ msg: err }))
}

const updateDate = async (req, res) => {
    const pacients = await Pacients.find();
    try {
        const date = await Dates.findById(req.params.id);
        if (!date) return res.json({ msg: "No se encontro la Cita" })

        date.pacient = req.body.pacient || date.pacient;
        date.date = req.body.date || date.date;
        await date.save();

        res.json({
            _id: date._id,
            pacient: pacients.find( pacient => pacient._id.toString() === date.pacient.toString()).name,
            date: date.date,
        });

    } catch (error) {
        res.json({ msg: error })
    }
}

const deleteDate = (req, res) => {
    Dates.findByIdAndDelete(req.params.id)
        .then(date => {
            if (!date) return res.json({ msg: "No se encontro la Cita" })
            res.json({ msg: "Cita eliminada" })
        })
        .catch(err => res.json({ msg: err }))
}

export { createDate, getDates, getOneDate, updateDate, deleteDate };


