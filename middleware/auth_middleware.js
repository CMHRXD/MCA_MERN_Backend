import  jwt  from "jsonwebtoken";
import doctorTable from '../models/doctors_model.js';

const checkAuth = async (req, res, next)=>{
    const {authorization} = req.headers;

    if(!authorization){ //Check if token exist
        return res.status(403).json({msg: "Token Inexistente"})
    }
    if(!authorization.startsWith('Bearer')){ //Can't read the properties of undefined, that's why we check after the first  if
        return res.status(403).json({msg: "Token no Valido"})
    }
    try{
        const token = authorization.split(' ')[1]; //Get the token  without Bearer
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//Validate JWT

        req.doctor = await doctorTable.findById(decoded.id).select("-password -token -validated") //Get the User

        next(); //Go to Profile
    }catch(e){
        return res.status(403).json({msg: "Token no Valido o Inexistente"})
    }
}

export default checkAuth;