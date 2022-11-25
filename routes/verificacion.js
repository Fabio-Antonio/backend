const { Router } = require('express');
const router = Router();
const {putVerificacion,getVerificacion,patchVerificacion} =  require('../controllers/verificacion');

const { validarVerificacion } = require('../middlewares/validar-verificacion');

router.put('/',
validarVerificacion,
putVerificacion);

router.get('/:token',getVerificacion);
router.patch('/:token/:numero',patchVerificacion);




module.exports = router;