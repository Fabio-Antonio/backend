const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {setCaracteristica} =  require('../controllers/caracteristicas');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCaracteristica } = require('../middlewares/validar-caracteristicas');

router.post('/',
validarJWT,
validarCaracteristica,
setCaracteristica);


module.exports = router;