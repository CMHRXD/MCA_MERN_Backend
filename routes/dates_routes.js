import express from "express";
import checkAuth from "../middleware/auth_middleware.js";

import {
    createDate, 
    getDates, 
    getOneDate, 
    updateDate, 
    deleteDate
}   from "../controllers/dates_routes_controller.js";

const datesRoutes = express.Router();

//route for get and post dates
datesRoutes.route("/").get(checkAuth, getDates).post(checkAuth, createDate);
//route for get, put and delete date
datesRoutes.route("/:id").get(checkAuth, getOneDate).put(checkAuth, updateDate).delete(checkAuth, deleteDate);

export default datesRoutes;