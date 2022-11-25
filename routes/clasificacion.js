const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getClasificacion,setClasificacion,getClasificacions,deleteClasificacion} =  require('../controllers/clasificacion');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/:uid',getClasificacion);
router.get('/',getClasificacions);
router.post('/',validarJWT,setClasificacion);
router.delete('/:uid',validarJWT,deleteClasificacion)
module.exports = router;