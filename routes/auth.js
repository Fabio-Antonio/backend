const { Router } = require('express');
const router = Router();
const {setAuth} =  require('../controllers/auth');

const { validarAuth } = require('../middlewares/validar-auth');

router.post('/',
validarAuth,
setAuth);

module.exports = router;