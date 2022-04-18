import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({path: '.env'});

//mongodb+srv://root:<password>@cluster0.tn19x.mongodb.net/test
const connectionDB = async ()=>{
    try {
        const db = await mongoose.connect(process.env.MOGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectionDB;