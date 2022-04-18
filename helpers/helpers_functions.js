import { text } from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const msgToken404 = (res)=> res.status(404).json({msg: "Token Invalido"})

//Generate Random ID
const idGenerator = ()=> Date.now().toString(32) + Math.random().toString(32).substring(2);
 
//Json Web Token Generator
/*JSON Web Token (JWT) es un estándar abierto (RFC-7519) 
basado en JSON para crear un token que sirva para enviar datos entre aplicaciones o servicios y garantizar que sean válidos y seguros*/ 
const JWTGenerator = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}

const confirmationEmail = async (data)=>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    const {email,name,token} = data;

    const info = await transport.sendMail({
        from: "APH - Administrador de Pacientes de Hospital",
        to:email,
        subject: "Comprueba tu cuenta en APH",
        text: "Comprueba tu cuenta en APH",

        html: `<p>Hola ${name}, comprueba tu cuenta en APH.</p>
               <p>Tu cuenta ya esta lista, solo debes comrpobarla en el siguente enlace:
                    <a href="${process.env.FRONTEND_URL}/confirmAccount/${token}">Comprobar Ahora</a>
               </p>

               <p>Si no has creado esta cuenta ignora el msg</p>
        `
    })
}

const PasswordEmail = async (data)=>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    const {email,name,token} = data;

    const info = await transport.sendMail({
        from: "APH - Administrador de Pacientes de Hospital",
        to:email,
        subject: "Restablece Tu Password",
        text: "Has solicitado restablecer tu Passowrd",

        html: `<p>Hola ${name}, has solicitado restablecer tu password.</p>
               <p>Sigue el siguente enlace para generar un nuevo password:
                    <a href="${process.env.FRONTEND_URL}/passwordForgot/${token}">Comprobar Ahora</a>
               </p>

               <p>Si no has creado esta cuenta ignora el msg</p>
        `
    })
}

export {idGenerator, JWTGenerator,msgToken404, confirmationEmail, PasswordEmail};