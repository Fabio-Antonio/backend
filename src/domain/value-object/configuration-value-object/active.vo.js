const  VOFormatException  = require("../../errors/vo.format.exception.js");
const  ValueObject  = require("../../value-object.js");

class ActiveVO extends ValueObject {
	/* equals(valueObject) {
		return (
			valueObject instanceof TitleVO && this.value === valueObject.value
		);
	}*/

	assertIsValid(value) {
		if (typeof value !== "boolean") {
			throw new VOFormatException(ActiveVO.name, value);
		}
	}
}
module.exports=ActiveVO;