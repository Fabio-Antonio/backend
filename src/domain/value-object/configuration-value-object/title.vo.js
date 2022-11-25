const  VOFormatException  = require("../../errors/vo.format.exception.js");
const  ValueObject  = require("../../value-object.js");

class TitleVO extends ValueObject {
	/* equals(valueObject) {
		return (
			valueObject instanceof TitleVO && this.value === valueObject.value
		);
	}*/

	assertIsValid(value) {
		if (value.length > 45) {
			throw new VOFormatException(TitleVO.name, value);
		}
	}
}
module.exports=TitleVO;