import Consults from "../models/consult_model.js";
import Products from "../models/products_model.js";
import Services from "../models/services_model.js";
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
    */
    const consult = new Consults(req.body);
    consult.save()
        .then(consult => {
            res.json(consult);
        }
        ).catch(err => {
            res.json({ msg: err });
        });
}

const getConsults = async (req, res) => {
    const pacients = await Pacients.find();

    Consults.find()
        .then(consults => {
            consults = consults.map(consult => {
                return {
                    _id: consult._id,
                    pacient: pacients.find( pacient => pacient._id.toString() === consult.pacient.toString()).name,
                    doctor: req.doctor.name,
                    products: consult.products,
                    services: consult.services,
                    date: consult.date,
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
    Consults.findById(req.params.id)
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
            consult.date = req.body.date || consult.date;
            consult.symptom = req.body.symptom || consult.symptom;
            consult.treatment = req.body.treatment || consult.treatment;
            consult.save()
                .then(consult => {
                    res.json(consult);
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
    Consults.findByidAndDelete(req.params.id)
        .then(consult => {
            if (!consult) return res.json({ msg: "Consulta no Encontrada" });
            res.json(consult);
        }
        ).catch(error => {
            res.json({ msg: error });
        });

}

export { addConsult, getConsults, getOneConsult, updateConsult, deleteConsult };
