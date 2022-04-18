import express  from "express";
import connectionDB from "./config/db.js";
import Dr_routes from "./routes/doctors_routes.js";
import pacientsRoutes from "./routes/pacients_routes.js";
import cors from 'cors'; //Protege los accesos a la API

const app = express();

app.use(express.json());
connectionDB();

//Para permitir acceso de otros dominios a nuestra api

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


//Define Host and Port
//const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;


app.use("/api/doctors", Dr_routes);
app.use("/api/pacients", pacientsRoutes);



app.listen(port,()=>{
    console.log(`El servidor se esta ejecutando en el Port:${port}`);
})