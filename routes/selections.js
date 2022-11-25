const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getSelections} =  require('../controllers/selections');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarColor } = require('../middlewares/validar-color');

router.get('/',
validarJWT,
getSelections)


module.exports = router;