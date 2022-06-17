import express from "express";
import checkAuth from "../middleware/auth_middleware.js";
import {
    addService,
    getServices,
    getOneService,
    updateService,
    deleteService
} from "../controllers/services_routes_controller.js";

const servicesRouter = express.Router();

// route for get and post services
servicesRouter.route("/").get(checkAuth, getServices).post(checkAuth, addService);
// route for get, put and delete service
servicesRouter.route("/:id").get(checkAuth, getOneService).put(checkAuth, updateService).delete(checkAuth, deleteService);

export default servicesRouter;