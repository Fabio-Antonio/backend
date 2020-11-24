const {Router} = require('express');
const {check} =require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const router = Router();
const {getUsuarios,crearUsuario, actualizaUsuario,enviar,borrarUsuario} =  require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/',validarJWT,getUsuarios);
router.post('/',[
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('password','El password es obligatorio').not().isEmpty(),
check('email','El email es obligatorio').isEmail(),
validarCampos,
],
crearUsuario);
//router.post('/',enviar);
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos,
    ],actualizaUsuario);
router.delete('/:id',validarJWT,borrarUsuario);




module.exports = router;