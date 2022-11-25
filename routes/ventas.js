const { Router } = require('express');
const router = Router();
const {crearVenta,getVentas,updateVenta} =  require('../controllers/ventas');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarVenta } = require('../middlewares/validar-campos');

router.post('/',
validarVenta,
crearVenta);

router.get('/:uid',validarJWT,getVentas);
router.put('/:token/:status',validarJWT,updateVenta);



module.exports = router;