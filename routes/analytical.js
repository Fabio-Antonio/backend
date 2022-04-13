const { Router } = require('express');
const router = Router();
const {getAnalitycs} =  require('../controllers/analytical');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',validarJWT,getAnalitycs);



module.exports = router;