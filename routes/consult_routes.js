import express from "express";

import checkAuth from "../middleware/auth_middleware.js";
import { addConsult, getConsults, getOneConsult, updateConsult, deleteConsult } from "../controllers/consult_routes_controller.js";

const consultRoutes = express.Router();

// route for get and post consults
consultRoutes.route("/").get(checkAuth, getConsults).post(checkAuth, addConsult);  
// route for get, put and delete consult  
consultRoutes.route("/:id").get(checkAuth,getOneConsult).put(checkAuth, updateConsult).delete(checkAuth, deleteConsult);

export default consultRoutes;