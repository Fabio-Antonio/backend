const {Schema,model} = require('mongoose');
const entregasSchema = Schema({
    nombre: {
       type: String,
       required: true
       },
    apellidos:{
        type: String,
        required: true
        },
    email:{
        type: String,
        required: true
        },
    direccion:{
        type: String,
        required: true
        },
        referencias:{
            type: String,
            required: true
            },

    telefono: {
        type: String,
        required: true
        },
    pais: {
        type: String,
        required: true
        },
    estado:{
        type: String,
        required: true
        },
    postal: {
        type: String,
        required: true
        },
    forma_pago: {
        type: String,
        required: true
        },
    nombre_tarjeta:{
        type: String,
        required: true
        },
    token:{
        type: String,
        required: true
        },
    fecha:{
        type: String,
        required: true
        },
    total:{
        type: Number,
        required: true
        },
    status:{
        type: String,
        required: true
        },
    terminos:{
        type: Boolean,
        required: true
        },
});
entregasSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('entregas',entregasSchema);

