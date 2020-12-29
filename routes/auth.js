const {Router} = require('express');
const { check } = require('express-validator');
const {login, GoogleSignIn} = require ('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');
const router =Router();

router.post('/',[
check('email','El correo es obligatorio').isEmail(),
check ('password','El password es obligatorio').not().isEmpty(),
validarCampos,
],login

);

router.post('/google',[
    check ('token','El token de google es obligatorio').not().isEmpty(),
    validarCampos,
    ],GoogleSignIn
    
    )

module.exports= router;