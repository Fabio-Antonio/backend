const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getProducto,setProducto,getProductos} =  require('../controllers/productos');

//const { validarJWT } = require('../middlewares/validar-jwt');



router.get('/:uid',getProducto);
router.get('/',getProductos);
router.post('/',setProducto);


module.exports = router;