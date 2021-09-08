const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getProductos_Reg} =  require('../controllers/buscar_reg');

const { validarUrl } = require('../middlewares/validar-busqueda');

router.get('/:uid',
validarUrl,
getProductos_Reg);


module.exports = router;