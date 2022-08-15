const {Schema,model} = require('mongoose');
const configurationSchema = Schema({

title: {
type:String,
required :true
},
url_image: {
type:String,
required :true
},
country: {
    type:String,
    required :true
    },
promotion:{ name: String, banner: String,active:Boolean }
});
configurationSchema.method('toJSON',function(){
const {_v,_id,...object}=this.toObject();
object.uid= _id;
return object;
})
module.exports = model('configuration',configurationSchema);
