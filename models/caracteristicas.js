const {Schema,model} = require('mongoose');
const caracteristicasSchema = Schema({

producto : {
    type: Schema.Types.ObjectId,
    ref: 'productos',
    required: true
},
caracteristica: {
    type: String,    
    required : true
}
},{collection:'caracteristicas'});
caracteristicasSchema.method('toJSON',function(){
    const {_v,...object}=this.toObject();
    return object;
})
module.exports = model('caracteristicas',caracteristicasSchema);