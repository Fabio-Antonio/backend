const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getProducto,setProducto,getProductos} =  require('../controllers/productos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarProducto } = require('../middlewares/validar-producto');



router.get('/:uid',getProducto);
router.get('/',getProductos);
router.post('/',
validarJWT,
validarProducto,
setProducto);


module.exports = router;