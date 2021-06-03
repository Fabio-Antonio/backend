const {Schema,model} = require('mongoose');
const tallaSchema = Schema({
talla: {
type:String,
required :true
}
},{collection:'talla'});
tallaSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;;
})
module.exports = model('talla',tallaSchema);