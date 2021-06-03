const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getClasificacion,setClasificacion} =  require('../controllers/clasificacion');
//const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/:uid',getClasificacion);
router.post('/',setClasificacion);
module.exports = router;