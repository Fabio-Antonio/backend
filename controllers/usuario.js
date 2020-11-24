
const Usuario = require('../models/usuarios');
const{response}=require('express');
const nodemailer = require('nodemailer');
const bcryptjs= require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const enviar = (req,res) => {
 var transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
 user: "ing.fabio.a@gmail.com", // Cambialo por tu email
 pass: "sunsmile3pace" // Cambialo por tu password
 }
 });
 console.log(req.body);
 const {email,password,nombre} = req.body;

const mailOptions = {
 from: `”${req.body.nombre}” <${req.body.email}>`,
 to: req.body.email, // Cambia esta parte por el destinatario
 subject: "prueba",
 text :"prueba",
 html: `
 <strong>Nombre:</strong> ${req.body.nombre} <br/>
 <strong>E-mail:</strong> ${req.body.email} <br/>
 <strong>Mensaje:</strong> ${req.body.nombre}
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}




const getUsuarios = async (req,res)=>{

    const usuarios = await Usuario.find({},'nombre email');
    res.json({
        ok:true,
        usuarios,
        uid: req.uid
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
