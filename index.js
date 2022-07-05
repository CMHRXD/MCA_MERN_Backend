import express  from "express";
import dotenv from "dotenv";
import connectionDB from "./config/db.js";

//Routes
import Dr_routes from "./routes/doctors_routes.js";
import pacientsRoutes from "./routes/pacients_routes.js";
import productsRoutes from "./routes/products_routes.js";
import servicesRoutes from "./routes/services_routes.js";
import datesRoutes from "./routes/dates_routes.js";
import consultRoutes from "./routes/consult_routes.js";


import cors from 'cors'; //Protege los accesos a la API


const app = express();  // Create an instance of express
app.use(express.json()); //Middleware para que el servidor entienda los datos en formato JSON
dotenv.config({path: '.env'}); //Configuracion de variables de entorno

/*
const allowedDomains = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedDomains.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}
app.use(cors(corsOptions));

*/

connectionDB(); // conect to DB

const PORT = process.env.PORT || 5000; // Set the port


app.use("/api/doctors", Dr_routes);
app.use("/api/pacients", pacientsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/dates", datesRoutes);
app.use("/api/consults", consultRoutes);

app.listen(PORT,()=>{
    console.log(`El servidor se esta ejecutando en el Port:${PORT}`);
})