const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getProducto,setProducto,getProductos} =  require('../controllers/productos');

const { validarProducto } = require('../middlewares/validar-producto');



router.get('/:uid',getProducto);
router.get('/',getProductos);
router.post('/',
validarProducto,
setProducto);


module.exports = router;