const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getProductos_Reg} =  require('../controllers/buscar_reg');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/:uid',getProductos_Reg);


module.exports = router;