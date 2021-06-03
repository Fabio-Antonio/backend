const {Schema,model} = require('mongoose');
const colores_cSchema = Schema({

producto : {
    type: Schema.Types.ObjectId,
    ref: 'productos',
    required: true
},
color : {
    type: Schema.Types.ObjectId,
    ref: 'color',
    required: true
},
},{collection:'colores_c'});
colores_cSchema.method('toJSON',function(){
    const {_v,...object}=this.toObject();
    return object;
})
module.exports = model('colores_c',colores_cSchema);