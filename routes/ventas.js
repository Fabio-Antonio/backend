const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {crearVenta,getVentas} =  require('../controllers/ventas');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',crearVenta);
router.get('/:uid',getVentas)



module.exports = router;