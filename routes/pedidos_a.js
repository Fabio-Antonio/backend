const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getVentasc} =  require('../controllers/pedidos_a');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',getVentasc);


module.exports = router;