const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {setCaracteristica} =  require('../controllers/caracteristicas');

const { validarCaracteristica } = require('../middlewares/validar-caracteristicas');

router.post('/',
validarCaracteristica,
setCaracteristica);


module.exports = router;