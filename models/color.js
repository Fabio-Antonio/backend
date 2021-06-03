const {Schema,model} = require('mongoose');
const colorSchema = Schema({
color: {
type:String,
required :true
}
},{collection:'color'});
colorSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('color',colorSchema);