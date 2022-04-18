import express  from "express";
import {signUp,profile,confirm,authenticate,passowrdForgot,checkToken,changePassowrd, updateProfile,updatePassword} from "../controllers/doctors_routes_controller.js"
import checkAuth from '../middleware/auth_middleware.js' 

const Dr_routes = express.Router();

//Public Area
Dr_routes.post("/", signUp);
Dr_routes.get('/confirm/:token', confirm)
Dr_routes.post("/login",authenticate);
Dr_routes.post("/password-forgot", passowrdForgot)
Dr_routes.route("/password-forgot/:token").get(checkToken).post(changePassowrd)

//Private Area
Dr_routes.get("/profile",checkAuth,profile);
Dr_routes.put("/profile/:id",checkAuth,updateProfile);
Dr_routes.put("/password-update",checkAuth,updatePassword);

export default Dr_routes;