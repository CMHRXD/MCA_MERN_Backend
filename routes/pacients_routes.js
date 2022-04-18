import express from "express";

import {addPacients,getPacients,
        getPacient,updatePacient,deletePacient} from "../controllers/pacients_routes_controller.js";

import checkAuth from "../middleware/auth_middleware.js";

const pacientsRoutes = express.Router();

//Add a pacient - Get all pacients
pacientsRoutes.route('/').post(checkAuth,addPacients).get(checkAuth,getPacients);

//Get-modify-delet one pacient
pacientsRoutes.route('/:id').get(checkAuth,getPacient).put(checkAuth,updatePacient).delete(checkAuth,deletePacient)

export default pacientsRoutes;