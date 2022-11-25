const { Router } = require('express');
const router = Router();
const {setImagen} =  require('../controllers/imagenes');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarImagen } = require('../middlewares/validar-imagen');

router.post('/',
validarJWT,
validarImagen,
setImagen);


module.exports = router;