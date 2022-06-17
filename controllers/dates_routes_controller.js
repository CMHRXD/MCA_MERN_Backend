import Dates from "../models/dates_model.js";

const createDate = (req, res) => {
    const date = new Dates(req.body);
    date.save()
        .then(date => res.json(date))
        .catch(err => res.json({ msg: err }))
}

const getDates = (req, res) => {
    Dates.find()
        .then(dates => res.json(dates))
        .catch(err => res.json({ msg: err }))
}

const getOneDate = (req, res) => {
    Dates.findById(req.params.id)
        .then(date => {
            if (!date) return res.json({ msg: "No se encontro la Cita" })
            res.json(date)
        })
        .catch(err => res.json({ msg: err }))
}

const updateDate = async (req, res) => {
    try {
        const date = await Dates.findById(req.params.id);
        if (!date) return res.json({ msg: "No se encontro la Cita" })

        date.pacient = req.body.pacient || date.pacient;
        date.date = req.body.date || date.date;

        await date.save();
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


