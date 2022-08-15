const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getConfiguration,setConfiguration,updateConfiguration} = require('../controllers/configuration');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',
getConfiguration);

router.post('/',
validarJWT ,
setConfiguration)

router.put('',
validarJWT,
updateConfiguration);

module.exports = router;