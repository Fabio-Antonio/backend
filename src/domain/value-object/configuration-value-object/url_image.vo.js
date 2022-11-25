const  VOFormatException  = require("../../errors/vo.format.exception.js");
const  ValueObject  = require("../../value-object.js");

class UrlImageVO extends ValueObject {
	/* equals(valueObject) {
		return (
			valueObject instanceof UrlImageVO && this.value === valueObject.value
		);
	}*/

	assertIsValid(value) {
		if (value.length > 300) {
			throw new VOFormatException(UrlImageVO.name, value);
		}
	}
}

module.exports= UrlImageVO;