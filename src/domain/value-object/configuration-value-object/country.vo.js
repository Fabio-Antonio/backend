
const  VOFormatException  = require("../../errors/vo.format.exception.js");
const  ValueObject  = require("../../value-object.js");

class CountryVO extends ValueObject {
	/*equals(valueObject) {
		return (
			valueObject instanceof CountryVO && this.value === valueObject.value
		);
	}*/ 

	assertIsValid(value) {
		if (value.length >2) {
			throw new VOFormatException(CountryVO.name, value);
		}
	}
}
module.exports=CountryVO;