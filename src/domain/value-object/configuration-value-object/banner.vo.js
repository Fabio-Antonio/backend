const  VOFormatException  = require("../../errors/vo.format.exception.js");
const  ValueObject  = require("../../value-object.js");

class BannerVO extends ValueObject {
	/* equals(valueObject) {
		return (
			valueObject instanceof UrlImageVO && this.value === valueObject.value
		);
	}*/

	assertIsValid(value) {
		if (value.length > 300) {
			throw new VOFormatException(BannerVO.name, value);
		}
	}
}

module.exports= BannerVO;