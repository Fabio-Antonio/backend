const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {crearVenta,getVentas,updateVenta} =  require('../controllers/ventas');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',crearVenta);
router.get('/:uid',getVentas);
router.put('/:token/:status',updateVenta);



module.exports = router;