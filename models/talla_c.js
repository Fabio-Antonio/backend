const {Schema,model} = require('mongoose');
const talla_cSchema = Schema({

producto : {
    type: Schema.Types.ObjectId,
    ref: 'productos',
    required: true
},
talla : {
    type: Schema.Types.ObjectId,
    ref: 'talla',
    required: true
},
},{collection:'talla_c'});
imagenesSchema.method('toJSON',function(){
    const {_v,...object}=this.toObject();
    return object;
})
module.exports = model('talla_c',talla_cSchema);