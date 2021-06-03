const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {crearPedido,getPedidos,deletePedido,getPedidosC} =  require('../controllers/pedidos');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',crearPedido);
router.get('/:token',getPedidos);
router.delete('/:uid',deletePedido);
router.get('/',getPedidosC);


module.exports = router;