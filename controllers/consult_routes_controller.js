import Consults from "../models/consult_model.js";
import Pacients from "../models/pacients_model.js";

const addConsult = (req, res) => {
    /*REQ BODY
        Doctor,    (id)
        Pacient,   (id)
        Products, (array-ids)
        Services, (array-ids)
        Date,
        Symptom,
        Treatment,
        total,
    */
    const consult = new Consults(req.body);
    consult.doctor = req.doctor._id;

    consult.save()
        .then(async consult => {
            const pacient = await Pacients.findById(consult.pacient);
            res.json({
                _id: consult._id,
                pacient: pacient.name,
                c_i: pacient.c_i,
                doctor: req.doctor.name,
                products: consult.products,
                services: consult.services,
                date: new Date(consult.date).toLocaleDateString(),
                total: consult.total,
                symptoms: consult.symptoms,
                treatment: consult.treatment,
            });
        }
        ).catch(err => {
            res.json({ msg: err });
        });
}

const getConsults = async (req, res) => {
    const pacients = await Pacients.find();
    Consults.find().where("doctor").equals(req.doctor)
        .then(consults => {
            consults = consults.map(consult => {
                const pacient = pacients.find(pacient => pacient._id.toString() === consult.pacient.toString());
                return {
                    _id: consult._id,
                    pacient: pacient.name,
                    c_i: pacient.c_i,
                    doctor: req.doctor.name,
                    products: consult.products,
                    services: consult.services,
                    date: new Date(consult.date).toLocaleDateString(),
                    total: consult.total,
                    symptoms: consult.symptoms,
                    treatment: consult.treatment,
                }

            });
            res.json(consults);
        }
        ).catch(error => {
            res.json({ msg: error });
        });
}

const getOneConsult = (req, res) => {
    Consults.findById(req.params.id).where("doctor").equals(req.doctor)
        .then(consult => {
            res.json(consult);
        }
        ).catch(error => {
            res.json({ msg: error });
        });
}

const updateConsult = (req, res) => {

    Consults.findById(req.params.id)
        .then(consult => {
            if (!consult) return res.json({ msg: "Consulta no Encontrada" });

            consult.pacient = req.body.pacient || consult.pacient;
            consult.doctor = req.body.doctor || consult.doctor;
            consult.services = req.body.services || consult.services;
            consult.products = req.body.products || consult.products;
            consult.symptoms = req.body.symptoms || consult.symptom;
            consult.treatment = req.body.treatment || consult.treatment;

            consult.save()
                .then(async consult => {
                    const pacient = await Pacients.findById(consult.pacient);
                    res.json({
                        _id: consult._id,
                        pacient: pacient.name,
                        c_i: pacient.c_i,
                        doctor: req.doctor.name,
                        products: consult.products,
                        services: consult.services,
                        date: new Date(consult.date).toLocaleDateString(),
                        total: consult.total,
                        symptoms: consult.symptoms,
                        treatment: consult.treatment,
                    });
                }
                ).catch(err => {
                    res.json({ msg: err });
                })
        }
        ).catch(error => {
            res.json({ msg: error });
        });
}

const deleteConsult = (req, res) => {
    Consults.findByIdAndDelete(req.params.id)
        .then(consult => {
            if (!consult) return res.json({ msg: "Consulta no Encontrada" });
            res.json(consult);
        }
        ).catch(error => {
            res.json({ msg: error });
        });

}

export { addConsult, getConsults, getOneConsult, updateConsult, deleteConsult };
