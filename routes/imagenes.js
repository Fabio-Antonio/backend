const { Router } = require('express');
const router = Router();
const {setImagen} =  require('../controllers/imagenes');

const { validarImagen } = require('../middlewares/validar-imagen');

router.post('/',
validarImagen,
setImagen);


module.exports = router;