

const nodemailer=require('nodemailer');
const e = require('express');
const {contenido_compra,contenido_verify,contenido_delivery}=require('./contenido-correo');
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587,
    auth: {
        user: process.env.CORREO,
        pass: process.env.PASS
    },
    tls: {
        ciphers:'SSLv3'
    }
});

const sendMail = async (nombre, email,token,total,direccion,pais,estado,pedidos) => {
    try {
    
        const mailOptions = {
            from: 'YA lO VI <yalovi.ventas.servicio@outlook.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: email,
            subject: 'Gracias por tu compra', // email subject
            html: await contenido_compra(nombre,token,total,direccion,pais,estado,pedidos)             // email content in HTML
        };


        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(info);
                    resolve(info);
                }
            });
        });
       
        return "Revise su orden de compra en su correo electrónico";

    } catch (error) {
        return "Error al envíar la notificación de correo electrónico espere la confirmación via sms";
    }
        
        // returning result
       
    }
    

    const sendMailVerify = async (email,verifyCode) => {
        try {
        
            const mailOptions = {
                from: 'YA lO VI <yalovi.ventas.servicio@outlook.com>', // Something like: Jane Doe <janedoe@gmail.com>
                to: email,
                subject: 'Completa la validación de e-mail', // email subject
                html: await contenido_verify(verifyCode)
            };
    
    
            await new Promise((resolve, reject) => {
                // send mail
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(info);
                        resolve(info);
                    }
                });
            });
           
            return "Se ha envíado el codigo de verificación a tu correo de manera correcta";
    
        } catch (error) {
            return "Error al envíar la notificación de correo electrónico espere la confirmación via sms";
        }
            
            // returning result
           
        }   
     
        
    const sendMailDelivery = async (email,mensaje,token) => {
        try {
        
            const mailOptions = {
                from: 'YA lO VI <yalovi.ventas.servicio@outlook.com>', // Something like: Jane Doe <janedoe@gmail.com>
                to: email,
                subject: 'Conoce el estátus de tu entrega', // email subject
                html: await contenido_delivery(mensaje,token)
            };
    
    
            await new Promise((resolve, reject) => {
                // send mail
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(info);
                        resolve(info);
                    }
                });
            });
           
            return "Se ha envíado el estátus de tu entrega";
    
        } catch (error) {
            return "Error al envíar la notificación de correo electrónico espere la confirmación via sms";
        }
            
            // returning result
           
        }   
        

    module.exports={
        sendMail,
        sendMailVerify,
        sendMailDelivery
    }