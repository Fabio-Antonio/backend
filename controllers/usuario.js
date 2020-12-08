
const Usuario = require('../models/usuarios');
const{response}=require('express');
const nodemailer = require('nodemailer');
const bcryptjs= require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const enviar = async (req,res) => {
    console.log(req.body);
 
var transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
 user: process.env.CORREO, // Cambialo por tu email
 pass: process.env.PASS, // Cambialo por tu password
 },
 });
 
 const {email,nombre,mensaje} = req.body;

const mailOptions = {
 from: `”Viversidad” <${process.env.CORREO}>`,
 to: req.body.email, // Cambia esta parte por el destinatario
 subject: "Estamos para servirle",
 html: `
 <!DOCTYPE html>
 <html lang=${"es"}>
   <head>
     <meta charset=${"utf-8"}>
     <meta http-equiv=${"X-UA-Compatible"} content=${"IE=edge"}>
     <meta name=${"viewport"} content=${"width=device-width, initial-scale=1"}>
      
     <!-- CSS -->
     <link href=${"/favicon.ico"} rel=${"shortcut icon"}>
     <link href=${"https://framework-gb.cdn.gob.mx/assets/styles/main.css"} rel=${"stylesheet"}>
</head>
 <body>
 <main class=${"page"}>

 <div class=${"container"}>
 <h1>   Viversidad</h1>
 <h2>Gracias por contactarnos</h2>

 <strong>Estimado </strong> <label>${req.body.nombre}</label>, <br/>
 <strong>se encuentra en status de: </strong> ${req.body.mensaje}
 </div>
 <div>
 <button onclick=${"location.href='http://google.com'"}class=${"btn btn-primary pull-right"}>Ir</button>

 </div>
 </main>

    <!-- JS -->
    <script src=${"https://framework-gb.cdn.gob.mx/gobmx.js"}></script>
 </body>
 </html>
 `,
 };
 await transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 res.json({
     ok:true,
     msg:"correo enviado"
 })
 });
}




const getUsuarios = async (req,res)=>{
    const desde = Number(req.query.desde)||0;
    console.log(desde);
    
    
    const [usuarios,total]= await Promise.all([
        Usuario.find({},'nombre email img')
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ])
    res.json({
        ok:true,
        usuarios,
        uid: req.uid,
        registrados: total

    });
    }


    const crearUsuario = async (req,res = response)=>{
        console.log(req.body);
        const {email,password,nombre} = req.body;
        
          
         try{
             const existeEmail = await Usuario.findOne({email});
             if(existeEmail){
                 return res.status(400).json({
                     ok: false,
                     msg : 'El correoya está registrado'
                 })
             }
            const usuario = new Usuario (req.body);
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync(password,salt);
            await usuario.save();
            const token = await generarJWT(usuario.id);
            res.json({
                ok:true,
                usuario,
                token
            });
         }catch(error){
          
            console.log(error);
            res.status(500).json({
                ok:false,
                msg: 'Error inesperado... revisar logs'
            });     
         }       
            
        
        }

const actualizaUsuario = async (req,res = response) => {
    const uid = req.params.id;
   try{
    const usuariodb = await Usuario.findById(uid);

    if(!usuariodb){
        return res.status(404).json({
            ok:false,
            msg: 'no existe es usuario'
        });     
    }
    const {password,google,...campos} = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new :true});

    res.json({
        ok:true,
        usuarioActualizado
    })
   }catch(error){

    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error inesperado... revisar logs'
    });     
 }       
   }




   const borrarUsuario = async (req,res = response) => {
    const uid = req.params.id;
   try{
    const usuariodb = await Usuario.findById(uid);

    if(!usuariodb){
        return res.status(404).json({
            ok:false,
            msg: 'no existe es usuario'
        });     
    }
    const usuarioBorrado = await Usuario.findByIdAndDelete(uid);

    res.json({
        ok:true,
        usuarioBorrado
    })
   }catch(error){

    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error inesperado... revisar logs'
    });     
 }       
   }






    module.exports = {
        getUsuarios,
        crearUsuario,
        enviar,
        borrarUsuario,
        actualizaUsuario
    }
