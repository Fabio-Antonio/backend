const {Schema,model} = require('mongoose');
const pedidoSchema = Schema({
    producto : {
        type: Schema.Types.ObjectId,
        ref: 'productos',
        required: true
    },
token: {
type:String,
required :true
},
nombre_producto:{
    type:String,
    required :true,
},
precio:{
    type:Number,
required :true

},
cantidad:{
    type:Number,

},
marca:{
    type:String,
required :true,
},
url_imagen:{
    type:String,
    default : false
},
color:{
    type:String,
},
talla:{
    type:String,
    default : "indistinta"
}
,
});
pedidoSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('pedido',pedidoSchema);