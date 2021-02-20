const {Router} = require('express');
const {check} =require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');

const {getmedico,crearmedico,actualizarmedico,borrarmedico} = require('../controllers/medicos')
router.get('/',getmedico);
router.post('/',[
    validarJWT,
    check('nombre','El nombre del médico es necesario').not().isEmpty(),
    check('hospital','El id del hospital es inválido').isMongoId(),
    validarCampos
],
crearmedico);
router.put('/:id',[
],actualizarmedico);
router.delete('/:id',borrarmedico);




module.exports = router;