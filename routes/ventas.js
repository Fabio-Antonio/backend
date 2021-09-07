const { Router } = require('express');
const router = Router();
const {crearVenta,getVentas,updateVenta} =  require('../controllers/ventas');

const { validarVenta } = require('../middlewares/validar-campos');

router.post('/',
validarVenta,
crearVenta);

router.get('/:uid',getVentas);
router.put('/:token/:status',updateVenta);



module.exports = router;