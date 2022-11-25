const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {setSize} =  require('../controllers/talla');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',
validarJWT,
setSize);

module.exports = router;