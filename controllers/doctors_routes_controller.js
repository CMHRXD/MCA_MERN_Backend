import doctorTable from '../models/doctors_model.js'
import bcrypt from "bcrypt";
import {idGenerator, JWTGenerator, msgToken404,confirmationEmail, PasswordEmail} from '../helpers/helpers_functions.js'

//DOCTORS ROUTES CONTROLLER
const signUp = async (req,res) => {
    const { name, email, password, cell} = req.body;

    //Avoid Duplicats Accounts
    const duplicateAccaunt = await doctorTable.findOne({email});
    if(duplicateAccaunt){ 
        return res.status(400).json({msg: "Usuario Registrado"});
    }

    try { //Save New Dr
        const doctor =  new doctorTable(req.body);
        const saveDoctor = await doctor.save();

        //Send Email
        confirmationEmail({email,name,token: saveDoctor.token})

        res.json(saveDoctor);

    } catch (error) {
        res.json({msg:error});
    } 
}

const confirm = async (req,res) => {
    const {token } = req.params;
    try {
        const searchUser = await doctorTable.findOne({token});
        if(!searchUser){
            return msgToken404(res);
        }
        //Delete token and updated validated status to true
        searchUser.token = null;
        searchUser.validated = true;

        await searchUser.save();
        res.json({msg: "Cuenta Confirmada"});

    } catch (error) {
        res.json({msg:error});
    }
}

const authenticate = async (req, res)=> {
    
    const {email, password} = req.body;

    const searchUser = await doctorTable.findOne({email});
    if(searchUser){
        if(searchUser.validated){
            if(await bcrypt.compare(password, searchUser.password)){
                searchUser.token = JWTGenerator(searchUser._id);
                res.json({
                    _id: searchUser._id,
                    name: searchUser.name,
                    email: searchUser.email,
                    cell: searchUser.cell,
                    web: searchUser.web,
                    token: searchUser.token,
                });

            }else{
                return res.status(401).json({msg: "Contraseña incorrecta"});
            }

        }else{
            return res.status(401).json({msg: "Usuario no Validado"});
        }
    }
    else{
        return res.status(403).json({msg: "Usuario No Existe"});
    }
}

//---------RESET PASSWORD START PROCCES---------//
const passowrdForgot = async(req, res)=>{

    const {email} = req.body;

    const checkUser = await doctorTable.findOne({email})
    if(!checkUser){
        return res.status(400).json({msg: "El usuario no existe"})
    }
    try {
        checkUser.token  = idGenerator();
        await checkUser.save();
        //Send Mail
        PasswordEmail({
            email,
            name: checkUser.name,
            token: checkUser.token,
        })

        res.send({msg:"Hemos enviado un Email con las Instrucciones"})
        
    } catch (error) {
        console.log(error)
    }
    
}

const checkToken= async(req, res)=>{
    const {token} = req.params;
    //Comprobar si el token no esta vacio.
    try {
        const validateToken = await doctorTable.findOne({ token });
        if(!validateToken){
            return msgToken404(res);
        }
        return res.json({msg:"El token es valido y el usuario existe"}) 
        
    } catch (error) {
        res.json({msg:error});
    }
}

const changePassowrd = async(req, res)=> {
    const {token} = req.params;
    const {password} = req.body;

    //Check token
    const doctor = await doctorTable.findOne({token});
    if(!doctor){
        return msgToken404(res);
    }
    try {
        doctor.token = null;
        doctor.password = password;
        await doctor.save();
        res.json({msg:"CAMBIO DE CONTRASEÑA EXISTOSO"});
    } catch (error) {
        res.json({msg:error});
    }
    
}
//---------RESET PASSWORD END PROCCES---------//

const profile = (req,res) => {
    const {doctor} = req;
    res.json(doctor);
};

const updateProfile = async (req,res) => {
    const {id} = req.params;
    const {name, email, cell, web} = req.body;

    try {
        const doctor = await doctorTable.findById(id);
        //Search doctor
        if(!doctor){
            return res.status(404).json({msg: "El doctor no existe"});
        }
        //Validate Email
        const duplicateEmail = await doctorTable.findOne({email});
        if(duplicateEmail){
            if(duplicateEmail.email !== doctor.email){
                return res.status(400).json({msg: "El email ya existe"});
            }
        }

        doctor.name = name || doctor.name;
        doctor.email = email || doctor.email;
        doctor.cell = cell || doctor.cell;
        doctor.web = web || doctor.web;
        await doctor.save();
        res.json(doctor)
        
    } catch (error) {
        res.json({msg:"No se ha podido actualizar el perfil"});
    }
}
const updatePassword = async (req,res) => {
    const {id} = req.doctor;
    const {pa,pn} = req.body;
    try {
        const doctor = await doctorTable.findById(id);
        if(!doctor){
            return res.status(404).json({msg: "El doctor no existe"});
        }
        //Validate Password
        if(!await bcrypt.compare(pa, doctor.password)){
            return res.status(400).json({msg: "La contraseña no es correcta"});
        }
        //Update Password
        doctor.password = pn;
        await doctor.save();
        res.json({msg:"Contraseña Actualizada"});
    } catch (error) {
        res.json({msg:"No se ha podido actualizar la contraseña"});
    }
}


export{
    signUp,profile,confirm,authenticate, passowrdForgot, checkToken,changePassowrd, updateProfile,updatePassword
}