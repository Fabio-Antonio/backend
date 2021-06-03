const {Schema,model} = require('mongoose');
const ProductosSchema = Schema({
    sub_categoria : {
        type: Schema.Types.ObjectId,
        ref: 'sub_categoria',
        required: true
    },   
nombre_producto: {
type:String,
required :true
},
precio:{
    type: Number,
    required :true,
},
marca : {
    type: Schema.Types.ObjectId,
    ref: 'marca',
    required: true
},
url_imagen:{
    type:String,

},
segunda_mano:{
    type:Boolean,
required :true,
default: false
},
descuento:{
    type:Boolean,
required :true,
default: false
}
,
});
ProductosSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('productos',ProductosSchema);