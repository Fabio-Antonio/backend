const Usuario = require('../models/usuarios');
const bcrypt = require ('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { response } = require('express');
const { verify } = require('jsonwebtoken');
const login = async (req,res= response) =>{

    const {email,password} = req.body;

    try{
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "El usuario no fué encontrado"
            })
        }

        const validarPassword = bcrypt.compareSync(password,usuarioDB.password);

        if(!validarPassword){
            return res.status(400).json({
                ok: false,
                msg: "Contraseña invalida"
            })
        }

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador"
        })
    }
}

GoogleSignIn = async (req,res = response) =>{
    const googletoken = req.body.token;
try {
    const {name,email,picture}=await verify(googletoken);
const usuarioDb = await Usuario.findOne({email});
let usuario;
if(!usuarioDb){
usuario = new Usuario({
    nombre : name,
    email,
    password: '@@@',
    img : picture,
    google : true
})
}else{
    usuario= usuarioDb;
    usuario.google= true;
}
 await usuario.save();
 const token = await generarJWT (usuario.id);
    res.json({
    ok:true,
    token,
    msg: 'GoogleSignIn',
    googletoken,
    name,email,picture
});
}catch(error){
    res.status(401).json({
        ok:false,
        msg: "token incorrecto"
    })
}
}

const renewToken=async(req,res=response)=>{
    const uid = req.uid;
    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);
    res.json({
        ok:true,
        token,
        usuario

    })
}

module.exports = {
    login,
    GoogleSignIn,
    renewToken
}