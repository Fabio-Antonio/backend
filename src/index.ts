import express from 'express';
import * as dotenv from 'dotenv' 
dotenv.config()
import cors from'cors';
import {dbConnection} from '../database/config';
import { userRouter } from './presentation/routes/user-routes';

const app = express();

app.use(cors());
app.use(express.json());
dbConnection();
 app.use(express.static('public')); 
// app.use('/api/categorias',require('./routes/categorias'));
 // app.use('/api/selections',require('./routes/selections'));
 app.use('/api/user',userRouter);
// app.use('/api/imagenes',require('./routes/imagenes'));
// app.use('/api/caracteristicas',require('./routes/caracteristicas'));
// app.use('/api/clasificacion',require('./routes/clasificacion'));
// app.use('/api/productos',require('./routes/productos'));
// app.use('/api/carrusel_principal',require('./routes/carrusel_principal'));
// app.use('/api/buscar',require('./routes/buscar'));
// app.use('/api/buscarreg',require('./routes/buscar_reg'));
// app.use('/api/marca',require('./routes/marca'));
// app.use('/api/pedidos',require('./routes/pedidos'));
// app.use('/api/pedidos_a',require('./routes/pedidos_a'));
// app.use('/api/ventas',require('./routes/ventas'));
// app.use('/api/color_c',require('./routes/color_c'));
// app.use('/api/talla',require('./routes/talla'));
// app.use('/api/analytical',require('./routes/analytical'));
// app.use('/api/verificacion',require('./routes/verificacion'));
// app.use('/api/auth',require('./routes/auth'));
const server= 
app.listen(process.env.PORT, () => {
console.log('servidor corriendo en puerto '+ process.env.PORT);
});
 module.exports = {app,server}