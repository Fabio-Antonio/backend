

const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const setAuth = async( req, res = response ) => {

    const { name,email,photoURL,phoneNumber } = req.body;

    try {
        
        // Verificar email
        const usuarioDB = await User.findOne({ email });

        if ( usuarioDB ) {
            const token = await generarJWT(usuarioDB);
            return res.json({
                ok: true,
                msg: 'Hola de nuevo!!',
                token
            });                
        }

        // Verificar contraseña
        //const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        const user={
          ...req.body,
          rol:"CL"
        }
        const usuario = new User(user);
        // Generar el TOKEN - JWT
        usuario.save()
        const token = await generarJWT(usuario);

        res.json({
            ok: true,
            msg: 'Bienvenido!!',
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'La autenticación falló'
        })
    }


}

module.exports={
    setAuth
}