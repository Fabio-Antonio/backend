const  DomainFormatException = require("./domian.format.exception.js");

class VOFormatException extends DomainFormatException {
	constructor(constructorName, value) {
		super(`${constructorName}: invalid value ${JSON.stringify(value)}`);
	}
}
module.exports= VOFormatException;