const  VOFormatException  = require("../../errors/vo.format.exception.js");
const  ValueObject  = require("../../value-object.js");

class NameVO extends ValueObject {
	/* equals(valueObject) {
		return (
			valueObject instanceof TitleVO && this.value === valueObject.value
		);
	}*/

    assertIsValid(value) {
		if (value.length > 45) {
			throw new VOFormatException(NameVO.name, value);
		}
	}
}
module.exports=NameVO;