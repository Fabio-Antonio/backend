const {Schema,model} = require('mongoose');
const sub_categoriaSchema = Schema({

categoria : {
    type: Schema.Types.ObjectId,
    ref: 'Categorias',
    required: true
},
sub_categoria : {
    type: String,    
    required : true
}
},{collection:'sub_categoria'});
sub_categoriaSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('sub_categoria',sub_categoriaSchema);