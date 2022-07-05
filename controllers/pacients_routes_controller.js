import Pacients from "../models/pacients_model.js"

const addPacients = async(req,res) => {

    try {
        const pacients = new Pacients(req.body);
        pacients.doctor = req.doctor._id
        await pacients.save();
        res.json(pacients);
        
    } catch (error) {
        res.json({error})
    }
}

const getPacients = async(req,res) => {
    const pacients = await Pacients.find().where("doctor").equals(req.doctor).select("c_i name phone");
    res.json(pacients)
}

//--- Start Get-Modify-Delet Pacient --- //
const getPacient = async(req, res) => {
    const {id} = req.params;

    try {
        const pacient = await Pacients.findById(id);
        
        if(pacient.doctor._id.toString() != req.doctor._id.toString()){ //Convert to string because they are object id
            return res.json("Acceso Invalido")
        }
        res.json(pacient);
    } catch (error) {
        console.log(error)
    }  
}
const updatePacient = async(req, res) => {
    const {id} = req.params

    try {
        const pacient = await Pacients.findById(id);
        if(pacient === null) return res.json("Paciente no encontrado");
        
        if(pacient.doctor._id.toString() != req.doctor._id.toString()){ //Convert to string because they are object id
            return res.json("Acceso Invalido")
        }
        pacient.name = req.body.name || pacient.name;
        pacient.c_i = req.body.c_i || pacient.c_i;
        pacient.phone = req.body.phone || pacient.phone;

        await pacient.save();
        
        res.json(pacient);
    } catch (error) {
        console.log(error)
    }
}
const deletePacient = async(req, res) => {
    const {id} = req.params

    try {
        const pacient = await Pacients.findById(id);
        if(pacient === null) return res.json("Paciente no encontrado");

        if(pacient.doctor._id.toString() != req.doctor._id.toString()){ //Convert to string because they are object id
            return res.json("Acceso Invalido")
        }
        pacient.deleteOne();
        res.json(pacient);
    } catch (error) {
        console.log(error)
    }
}
//--- END Get-Modify-Delet Pacient --- //

export{
    addPacients,getPacients,
    getPacient,updatePacient,deletePacient
}